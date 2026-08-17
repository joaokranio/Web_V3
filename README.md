# WEB_V3 — Testes automatizados (Playwright)

Suíte de testes end-to-end do sistema da Sectra, escrita em Playwright +
TypeScript. Cobre por enquanto login, home, pedidos de venda, negativas e
cadastro de clientes.

## Rodando localmente

Precisa do Node instalado. Depois:

```bash
npm install
```

Cria um `.env` na raiz (não é versionado) com essas variáveis:

```
BASE_URL=http://<host>:5010/#/login
API_URL=http://<host>:5011
USER_ADMIN=<usuário de teste>
PASSWORD_ADMIN=<senha>
USER_GUEST=<usuário guest>
PASSWORD_GUEST=<senha guest>
HEADLESS=true
```

Pra rodar tudo:

```bash
npx playwright test
```

Só um arquivo, ou filtrando por tag:

```bash
npx playwright test tests/loginPage.spec.ts
npx playwright test --grep @smoke
```

O relatório em HTML abre com `npx playwright show-report` depois da execução.

## Estrutura

```
pages/        Page Objects — um por tela (loginPage, homePage, pedidoPage, clientePage, negativasPage...)
tests/        Os specs em si, um arquivo por página/fluxo
fixtures/     Fixtures customizadas do Playwright (login, sessão, seeds de API, etc.)
components/   Pedaços de UI/validações reaproveitados entre páginas (Toast, Pesquisa, BotoesGrid, validarDataAtual)
config/       Leitura das variáveis de ambiente
test-data/    Massa de dados usada nos testes (factories geram payload único por chamada)
api/          Camada de acesso à API (REST + GraphQL) — ver seção abaixo
wiki/         Documentação dos cenários de teste e decisões de arquitetura
```

`services/` e `utils/` existem mas ainda estão vazias — reservadas pra quando
precisar, não apaguei porque não sei se alguém já tem planos pra elas.

## Como o login funciona nos testes

Esse foi o ponto que mais deu dor de cabeça no início. Rodando os testes em
paralelo (o `playwright.config.ts` usa `fullyParallel: true`), se cada teste
fizer login do zero, os workers acabam brigando pelo mesmo `refreshToken` e
um derruba a sessão do outro.

A solução ficou em `fixtures/home.fixture.ts`: cada **worker** loga uma única
vez e guarda o `storageState` resultante. Cada teste novo herda esse estado
(um `browser context` novo por teste, pra trace/screenshot/vídeo funcionarem
direito), e só relêga se perceber que a sessão herdada caiu — por exemplo
depois de um teste de logout.

Na prática isso significa: se você está escrevendo um teste novo, não precisa
se preocupar em fazer login manualmente, só usar o `page` que a fixture
entrega.

## Padrão dos specs

Os arquivos de teste seguem Given/When/Then em comentário (`Dado que` /
`Quando` / `Então`) em cima de cada `test()`. `loginPage.spec.ts` é o mais
completo — os outros (`negativasPage.spec.ts`, `pedidoVenda.spec.ts`,
`clientePage.spec.ts`) ainda estão como esqueleto: os títulos e os comentários
Gherkin já estão lá, faltando implementar a interação de fato com a página.
Isso foi proposital — documentamos o cenário primeiro, implementamos depois.

Os cenários de cada página também ficam espelhados em markdown dentro de
`wiki/` (ex.: `wiki/loginpage.md`, `wiki/clientepage.md`), pensado pra servir
de referência na migração do sistema de Vue 2 pra Vue 3, sem precisar ler
código.

## Tags dos testes

Toda `test()` leva um `{ tag: [...] }` como segundo argumento. Pensando em
rodar isso no CI/CD no futuro (e também no dia a dia local), adotamos 3 eixos
de tag **independentes entre si** — cada teste pode/deve ter uma tag de cada
eixo ao mesmo tempo, porque cada eixo responde a uma pergunta diferente na
hora de decidir o que rodar.

### 1. Severidade/criticidade — "o quanto dói se isso quebrar?"

`@critical` · `@high` · `@medium` · `@low`

Essa tag descreve o **impacto no negócio** se aquele cenário específico
parar de funcionar em produção, não a dificuldade do teste em si. Ela importa
porque, quando o tempo de execução do CI é curto (ex.: pipeline de PR) ou
quando várias suítes falham ao mesmo tempo, você precisa saber **por onde
começar a triagem** — um `@critical` quebrado bloqueia o pipeline/deploy, um
`@low` pode virar um card pra depois.

- **`@critical`**: o sistema fica inutilizável ou gera dado incorreto/perdido
  se isso quebrar. Ex.: não conseguir fazer login, salvar um cadastro com
  campo obrigatório sem validação. Bloqueia deploy.
- **`@high`**: funcionalidade importante quebrada, mas existe *workaround* ou
  o impacto fica restrito a um fluxo específico (não trava o sistema todo).
- **`@medium`**: funcionalidade secundária ou de conveniência (ex.: um
  assistente de preenchimento, uma ordenação de coluna) — incomoda, não
  impede o uso.
- **`@low`**: cosmético ou uso raro (ex.: excluir um documento anexado a um
  pedido). Vira card de backlog, não bloqueia nada.

**Status atual**: só `pedidoVenda.spec.ts` tem essa gradação definida de
verdade — foi importado de outra suíte que já vinha com esse critério
avaliado. Nos demais specs ainda não decidimos a criticidade de cada cenário
(fica pra uma próxima etapa, propositalmente não mexemos nisso agora).

### 2. Profundidade/frequência — "quando isso deve rodar?"

`@smoke` · `@regression`

Essa tag decide **a que cadência** aquele teste roda no pipeline — é sobre
tempo de feedback, não sobre importância do cenário (um `@smoke` pode ser
`@low` e um `@regression` pode ser `@critical`, são eixos diferentes).

- **`@smoke`**: subconjunto pequeno e rápido, cobrindo os fluxos principais
  ("o sistema não caiu"). Pensado pra rodar em **todo push/PR** — precisa
  terminar rápido pra não travar quem está desenvolvendo.
- **`@regression`**: suíte mais ampla, cobrindo variações e casos de borda.
  Mais lenta, mais cara — pensada pra rodar com menos frequência (ex.:
  agendada, antes de um release), não a cada commit.

### 3. Feature/tela — "o que está sendo testado?"

`@negativas` · `@login` · `@home` · `@clientes` · `@pedidos_venda`

Essa é a tag que resolve o problema prático de só querer rodar os testes da
tela que você está mexendo, sem esperar a suíte inteira — em vez de apontar
pro arquivo (`npx playwright test tests/negativasPage.spec.ts`), você filtra
por tag, o que também funciona pra combinar com os outros dois eixos (ex.:
só o smoke de negativas). Uma tag por página/domínio, atribuída a **todo**
teste daquele spec (implementado ou ainda placeholder).

```bash
npx playwright test --grep @negativas                          # só a tela de Negativas
npx playwright test --grep "(?=.*@negativas)(?=.*@smoke)"      # negativas + smoke, combinando eixos
npx playwright test --grep "@critical"                          # tudo que é crítico, qualquer tela
```

(o `--grep` casa contra o título completo do teste, que inclui as tags na
ordem em que foram declaradas no array — por isso `"@negativas.*@smoke"`
simples pode não bater dependendo da ordem; o padrão com `(?=...)` funciona
independente de ordem.)

`clientePage.spec.ts` mantém a tag `@cadastro` que já existia (fluxo de
cadastro do cliente) além da nova `@clientes` — não removi porque pode ter
um sentido próprio pretendido por quem escreveu, só adicionei a tag de
feature em cima pra ficar consistente com o resto.

## Testes via API

O backend usa REST só pra login e seleção de filial; o resto (clientes,
pedidos, negativas, etc.) é GraphQL. A pasta `api/` permite criar massa de
dados via API antes de um teste de UI (em vez de preencher formulário
manualmente) e excluir esses dados depois automaticamente.

**Negativas já está funcional de ponta a ponta** — `api/queries/negativa.ts`
tem as mutations/query confirmadas contra o servidor real, e
`pages/negativasPage.ts` expõe os métodos de API direto na classe `Negativas`
(padrão POM: o teste só chama o método, a lógica de API fica no Page Object):

```ts
const negativas = new Negativas(page)

const negativa = await negativas.createNegativa()      // cria via GraphQL
await negativas.deleteNegativa(negativa.id)             // exclui pelo id
await negativas.buscarNegativaPorObservacao('texto')     // localiza pela observação
await negativas.deleteNegativaPorObservacao('texto')     // busca + exclui, com log de aviso se falhar
```

Não precisa passar `request`/`apiAuthHeaders` pra nenhum desses métodos — a
autenticação é resolvida sozinha por `api/apiContext.ts` (cacheada por
worker, ver `wiki/api-testing-arquitetura.md` seção 8). Também existe uma
fixture `negativaSeed` (`fixtures/api.fixture.ts`) que cria e exclui a
negativa automaticamente ao redor do teste, pra quando o cenário não precisa
de controle manual do create/delete.

**Clientes ainda é placeholder** — `api/queries/cliente.ts` tem `// TODO`
nos nomes de campos/mutations, que ainda não foram capturados contra o
schema real. O padrão a seguir quando isso for feito é o mesmo já validado
em Negativas (métodos de API no próprio Page Object, sem lógica solta nos
specs). A ideia, o porquê de cada escolha (por que não usamos axios, por que
a sessão é por worker, por que o teardown é automático via fixture) está
detalhada em `wiki/api-testing-arquitetura.md` — vale ler antes de mexer
nessa parte.

## Validações reaproveitáveis (`components/`)

Além de `Toast`, `Pesquisa` e `BotoesGrid`, `components/validacaoData.ts`
exporta `validarDataAtual(locator)` — valida se um campo/coluna de data
(ex.: "data de cadastro") corresponde à data atual do sistema. É genérica de
propósito: recebe o `Locator` de onde a data está, então serve tanto pra
validar no momento do cadastro (campo do formulário) quanto depois, na grid
— e não é exclusiva de nenhuma tela, dá pra importar em qualquer spec
(Negativas, Pedido, Cliente...).

```ts
import { validarDataAtual } from '../components/validacaoData'

// passe o locator de onde a data está — campo do formulário, célula da
// grid, etc. (ainda não existe locator pronto pra isso em negativasPage.ts,
// é só ilustrativo):
await validarDataAtual(page.locator('#negativa-data-cadastro'))
await validarDataAtual(page.locator('td.coluna-data').nth(0))
```

