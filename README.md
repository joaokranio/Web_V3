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
pages/        Page Objects — um por tela (loginPage, homePage, pedidoPage, clientePage...)
tests/        Os specs em si, um arquivo por página/fluxo
fixtures/     Fixtures customizadas do Playwright (login, sessão, etc.)
components/   Pedaços de UI reaproveitados entre páginas (ex.: Toast)
config/       Leitura das variáveis de ambiente
test-data/    Massa de dados usada nos testes
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
`Quando` / `Então`) em cima de cada `test()`, com tags tipo `@critical`,
`@smoke`, `@regression` pra facilitar rodar subconjuntos. `loginPage.spec.ts`
é o mais completo — os outros (`negativasPage.spec.ts`, `pedidoVenda.spec.ts`,
`clientePage.spec.ts`) ainda estão como esqueleto: os títulos e os comentários
Gherkin já estão lá, faltando implementar a interação de fato com a página.
Isso foi proposital — documentamos o cenário primeiro, implementamos depois.

Os cenários de cada página também ficam espelhados em markdown dentro de
`wiki/` (ex.: `wiki/loginpage.md`, `wiki/clientepage.md`), pensado pra servir
de referência na migração do sistema de Vue 2 pra Vue 3, sem precisar ler
código.

## Testes via API (em construção)

O backend usa REST só pra login e seleção de filial; o resto (clientes,
pedidos, etc.) é GraphQL. A pasta `api/` começou a ser criada pra permitir
criar massa de dados via API antes de um teste de UI (em vez de preencher
formulário manualmente) e excluir esses dados depois automaticamente.

Isso ainda **não está funcional** — os endpoints exatos (paths, payloads,
nomes de campos no GraphQL) ainda não foram capturados, então tudo que tem
`// TODO` em `api/authClient.ts`, `api/graphqlClient.ts` e
`api/queries/cliente.ts` são placeholders. A ideia, o porquê de cada escolha
(por que não usamos axios, por que a sessão é por worker, por que o teardown
é automático via fixture) está detalhada em `wiki/api-testing-arquitetura.md`
— vale ler antes de mexer nessa parte.

