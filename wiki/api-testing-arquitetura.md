# Testes via API (REST + GraphQL) — Decisões de Arquitetura

> Registro de decisão (ADR) para consulta futura. Cobre a camada de API criada
> para gerar massa de dados de apoio aos testes de UI (setup) e removê-la
> depois (teardown). Escrito em 2026-08-03, escopo inicial: Clientes.
>
> **Atualização (2026-08-11)**: escopo expandido para Negativas, já
> funcional de ponta a ponta (endpoints confirmados, não é mais placeholder).
> A seção 8 documenta as decisões novas — método de API dentro do próprio
> Page Object (padrão POM) e autenticação self-contained via
> `api/apiContext.ts`.

## 1. Problema que motivou isso

Os testes de UI de cadastro (`clientePage.spec.ts`, `pedidoVenda.spec.ts`, etc.)
frequentemente precisam de dados que já existam no sistema antes do teste
começar (ex.: "editar um cliente já cadastrado", "criar um pedido para um
cliente X"). Até aqui isso só podia ser feito criando o registro manualmente
pela própria UI dentro do teste — lento, frágil e acopla o teste de uma
funcionalidade à criação de dados de outra.

A solução é ter uma camada de API que cria a massa de dados **antes** do
teste e a exclui **depois**, mantendo o teste focado em validar a UI, não a
criação dos dados.

## 2. Como a API do sistema é organizada

Descoberto ao inspecionar `pages/loginPage.ts` e a config do projeto — o
backend combina dois estilos na mesma origem (`ENV.API_URL`, host separado de
`ENV.BASE_URL`):

- **REST**: login e seleção de filial (evidência: cookie `refreshToken`
  httpOnly/JWT setado após o login).
- **GraphQL**: todo o resto — clientes, pedidos, negativas, etc.

Isso definiu a estrutura em duas camadas: um client REST só para autenticação
(`api/authClient.ts`) e um client GraphQL genérico e reaproveitável para
qualquer entidade (`api/graphqlClient.ts`).

## 3. Decisões tomadas e o porquê

### 3.1 `APIRequestContext` nativo do Playwright, sem `axios`/`graphql-request`
O projeto tinha zero dependências de HTTP client (`package.json` só tem
`@playwright/test`, `dotenv`, `@types/node`). O fixture `request` (e a API
estática `request.newContext()`) do próprio Playwright já resolve tudo que
precisávamos — cookies, headers, baseURL — sem adicionar dependência nova.
GraphQL nada mais é que um `POST` com `{ query, variables }`, então não
precisa de um client GraphQL dedicado.

### 3.2 Client GraphQL genérico, um arquivo de queries por entidade
`api/graphqlClient.ts` não sabe nada sobre "cliente" — só sabe fazer POST e
tratar `errors`/`data`. Cada entidade (hoje só `api/queries/cliente.ts`) tem
suas próprias strings de mutation/query e tipos. Isso significa que expandir
para Pedidos ou Negativas no futuro é só criar `api/queries/pedido.ts` — o
client genérico e o padrão de fixture não mudam.

### 3.3 Escopo inicial: só Clientes
Escolhido como prova de conceito por ser a entidade mais madura no momento
(`wiki/clientepage.md`, `test-data/clienteValido.json` já existiam). A ideia é
validar o padrão end-to-end com uma entidade antes de replicar para outras.

### 3.4 Setup/teardown como fixture automática (não helper manual)
Decisão: `clienteSeed` é uma fixture do Playwright que cria o cliente via
GraphQL antes de `await use(cliente)` e o exclui depois — **mesmo se o teste
falhar**, porque o Playwright sempre roda o código depois do `use()` no
teardown da fixture, independente do resultado do teste.
Alternativa descartada: funções helper (`criarClienteViaApi()` /
`excluirClienteViaApi()`) chamadas manualmente dentro de cada teste — mais
explícito, mas exige lembrar de chamar o teardown em todo teste, e um teste
que falha antes de chegar na chamada de exclusão vazaria dado.

### 3.5 Sessão de API autenticada uma vez por worker
`apiAuthHeaders` é uma fixture `worker`-scoped: autentica uma única vez por
worker e é reaproveitada por todos os testes daquele worker, em vez de logar
via REST a cada teste. Mesmo raciocínio já usado em `fixtures/home.fixture.ts`
(`authState`): evitar bater no endpoint de login repetidamente e evitar
condição de corrida em cima do `refreshToken` quando vários workers rodam em
paralelo (o projeto já roda com `fullyParallel: true`).

**Detalhe técnico que exigiu ajuste durante a implementação**: a fixture
`request` nativa do Playwright é *test-scoped* — uma fixture `worker`-scoped
não pode depender dela (o Playwright acusa erro `"worker fixture cannot
depend on a test fixture"`). Por isso `apiAuthHeaders` cria seu próprio
`APIRequestContext` via a API estática `request.newContext()` (importada de
`@playwright/test`, não a fixture), autentica, e descarta esse context restrito
(`context.dispose()`) — só os headers resultantes ficam guardados para o
worker inteiro. Já `clienteSeed`, que é test-scoped, usa a fixture `request`
normalmente.

### 3.6 Dados de teste únicos por chamada (factory, não JSON estático)
`test-data/clienteValido.json` já existia, mas é um arquivo estático — usá-lo
direto para criar clientes via API faria toda execução em paralelo colidir
(mesmo CNPJ/Razão Social). `test-data/clienteFactory.ts` gera um payload novo
a cada chamada, com sufixo de timestamp/random e prefixo `AUTOMACAO_` no nome
— fácil de identificar e limpar manualmente caso algum teardown falhe e o
registro escape. O JSON estático continua existindo só para os testes de UI
que preenchem o formulário manualmente (caso de uso diferente).

### 3.7 Teardown não deve mascarar falha do teste
A exclusão do cliente dentro de `clienteSeed` está em `try/catch` — se a
exclusão falhar, só loga um aviso (`console.warn`) em vez de lançar. Um erro
de limpeza não deve fazer um teste que já passou (ou já falhou por outro
motivo) aparecer como falho por um motivo secundário.

### 3.8 `mergeTests` para combinar UI + API num único `test`
`fixtures/api.fixture.ts` usa `mergeTests(homeTest, apiTest)` para expor
`page`, `homePage` (de `home.fixture.ts`) e `apiAuthHeaders`/`clienteSeed` (da
camada nova) num único `test` importável. Um spec de UI que precisa de massa
de API só troca o import de `../fixtures/home.fixture` para
`../fixtures/api.fixture` e ganha acesso a `clienteSeed` sem perder nada do
que já usava.

## 4. Estrutura de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `api/authClient.ts` | Login REST + seleção de filial → retorna headers de autenticação |
| `api/graphqlClient.ts` | POST genérico para GraphQL, tratamento de `errors` |
| `api/apiContext.ts` | Autentica uma vez por worker e cacheia — usado pelos métodos de API dos Page Objects (ver seção 8) |
| `api/queries/cliente.ts` | Mutations/queries e tipos específicos de Cliente (placeholders, `// TODO`) |
| `api/queries/negativa.ts` | Mutations/queries e tipos específicos de Negativa (confirmados contra o servidor real) |
| `test-data/clienteFactory.ts` | Gera payload de cliente único por chamada |
| `test-data/negativaFactory.ts` | Gera payload de negativa único por chamada |
| `pages/negativasPage.ts` | Page Object de Negativas — locators de UI **e** métodos de API (`createNegativa`/`buscarNegativaPorObservacao`/`deleteNegativa`/`deleteNegativaPorObservacao`) |
| `fixtures/api.fixture.ts` | `apiAuthHeaders` (sessão por worker) + `clienteSeed`/`negativaSeed` (setup/teardown automático) + `mergeTests` com `home.fixture` |

## 5. Como usar num spec

Via fixture (setup/teardown automático — preferível quando o teste só
precisa que o registro exista, sem controlar o momento da criação/exclusão):

```ts
import { test, expect } from '../fixtures/api.fixture'

test('Deve exibir cliente criado via API na grid', async ({ page, homePage, clienteSeed }) => {
    // clienteSeed já é o cliente criado via GraphQL antes do teste começar
    // (e será excluído automaticamente depois, mesmo se o teste falhar)
})

test('Deve localizar negativa criada via API na pesquisa geral', async ({ page, negativaSeed }) => {
    // negativaSeed idem, via Negativas.createNegativa()/deleteNegativa() (ver seção 8)
})
```

Chamando os métodos do Page Object diretamente (quando o teste precisa
controlar o momento exato do create/delete):

```ts
import { test, expect } from '../fixtures/api.fixture'
import { Negativas } from '../pages/negativasPage'

test('...', async ({ page }) => {
    const negativas = new Negativas(page)

    const negativa = await negativas.createNegativa()
    // ...
    await negativas.deleteNegativa(negativa.id)
})
```

## 6. O que ainda falta (bloqueia execução real, não a arquitetura)

Os itens 1 e 2 já foram resolvidos (compartilhados por qualquer entidade,
confirmados enquanto implementava Negativas — ver seção 8). O que falta hoje
é específico de Clientes:

1. ~~Path e payload exatos do login REST e da seleção de filial~~ — resolvido
   em `api/authClient.ts`.
2. ~~Path do endpoint GraphQL e formato exato do header de autorização
   esperado~~ — resolvido em `api/graphqlClient.ts`.
3. Nome e shape reais da mutation de criar/excluir cliente — os nomes de
   campos em `api/queries/cliente.ts` **ainda são placeholders** (`// TODO`),
   podem não bater com o schema real.

Ordem de verificação recomendada pra fechar o item 3 (mesma que validou
Negativas — ver seção 8):
1. Teste isolado só com a fixture nativa `request` do Playwright: uma
   mutation de criação simples, conferindo 200 e o payload esperado — antes
   de mexer nos fixtures.
2. Testar `clienteSeed` isoladamente (confirmar que o cliente existe logo
   após o setup e não existe mais logo após o teardown).
3. Só então integrar num spec de UI real, seguindo o padrão de
   `pages/negativasPage.ts` (métodos de API no próprio Page Object, não
   soltos no spec).

## 7. Alternativas consideradas e descartadas

- **`axios` / `graphql-request` como dependência**: descartado — o
  `APIRequestContext` nativo já cobre o necessário sem aumentar a superfície
  de dependências do projeto.
- **Framework genérico multi-entidade desde já** (Clientes + Pedidos +
  Negativas ao mesmo tempo): descartado por ora — preferimos validar o padrão
  com uma entidade (Clientes) antes de replicar, para não desenhar em cima de
  suposições erradas sobre o schema.
- **Capturar os endpoints reais antes de desenhar a arquitetura**: descartado
  — decidimos desenhar a arquitetura de forma agnóstica ao schema primeiro
  (fixtures, client genérico, convenção de teardown) e deixar a descoberta
  dos endpoints reais como próximo passo separado, já que uma coisa não
  bloqueia a outra.

## 8. Evolução: Negativas — métodos de API no Page Object (2026-08-11)

Com Negativas confirmada e funcional (mutations/queries reais em
`api/queries/negativa.ts`), duas decisões novas além das da seção 3:

### 8.1 A lógica de API mora no Page Object, não no spec
Antes, um teste que precisava criar+excluir uma Negativa via API (fora do
fluxo automático do `negativaSeed`) reimplementava isso na mão dentro do
`test(...)` — busca por observação, `if` checando se achou, `try/catch` no
delete. Isso duplicava a mesma lógica em vários specs e, quando a
mutation/schema mudasse, seria preciso caçar cada ocorrência.

Decisão: `pages/negativasPage.ts` ganhou métodos de API na própria classe
`Negativas` — `createNegativa`, `buscarNegativaPorObservacao`,
`deleteNegativa`, `deleteNegativaPorObservacao`. O spec só chama o método:

```ts
const negativas = new Negativas(page)

const negativa = await negativas.createNegativa()
// ...usa a negativa no teste...
await negativas.deleteNegativa(negativa.id)

// ou, quando a negativa foi criada pela UI (sem id conhecido):
await negativas.deleteNegativaPorObservacao(obs)
```

Isso segue o mesmo espírito da seção 3.4 (teardown não deve ser lógica solta
manual) — só que agora aplicado também a chamadas feitas *dentro* do corpo
do teste, não só no teardown de fixture. Padrão a repetir em qualquer Page
Object novo que precise de API (`clientePage.ts`, `pedidoPage.ts`).

### 8.2 Autenticação self-contained (`api/apiContext.ts`)
Primeira versão desses métodos exigia passar `request`/`apiAuthHeaders` a
cada chamada (ou no construtor do Page Object) — fácil de esquecer e gerar
erro em runtime só percebido ao rodar o teste. `api/apiContext.ts` resolve
isso: autentica uma vez por processo de worker e cacheia o resultado (mesma
ideia da fixture `apiAuthHeaders`, seção 3.5, só que como uma função pura,
acessível de dentro de um Page Object sem depender do ciclo de fixtures do
Playwright).

```ts
// dentro de um método de API do Page Object:
const { request, headers } = await getApiContext()
await graphqlRequest(request, headers, MinhaQuery.CREATE, { ... })
```

Resultado: `new Negativas(page)` sempre funciona, com ou sem métodos de API
em uso — quem escreve o teste não precisa saber que por trás existe
autenticação acontecendo.

### 8.3 Nomes de mutation/query curtos, namespaced pelo próprio arquivo
`api/queries/negativa.ts` exporta `CREATE`/`FIND`/`DELETE` (não
`CREATE_NEGATIVA_MUTATION` etc.) — o prefixo da entidade já vem do nome do
arquivo/módulo. Quem consome importa como namespace, mantendo a origem
legível no ponto de uso sem repetir o nome da entidade duas vezes:

```ts
import * as NegativaQueries from '../api/queries/negativa'
// uso: NegativaQueries.CREATE, NegativaQueries.FIND, NegativaQueries.DELETE
```

Tipos exportados (`NegativaPayload`, `NegativaCriada`) continuam com o
prefixo da entidade, porque esses cruzam para outros arquivos que também
importam os equivalentes de outras entidades no mesmo lugar (ex.:
`fixtures/api.fixture.ts` importa `NegativaCriada` e `ClienteCriado` juntos)
— aí um nome genérico colidiria ou ficaria ambíguo.
