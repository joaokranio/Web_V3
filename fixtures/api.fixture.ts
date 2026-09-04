import { test as base, mergeTests, request } from '@playwright/test'
import { test as homeTest, expect } from './home.fixture'
import { authenticate, AuthHeaders } from '../api/authClient'
import { graphqlRequest } from '../api/graphqlClient'
import { CREATE_CLIENTE_MUTATION, DELETE_CLIENTE_MUTATION, ClienteCriado } from '../api/queries/cliente'
import { buildClientePayload } from '../test-data/clienteFactory'
import { NegativaCriada } from '../api/queries/negativa'
import { Negativas } from '../pages/negativasPage'
import { negativaPayloads } from '../test-data/negativaFactory'
import { ClientePage } from '../pages/clientePage'

type ApiWorkerFixtures = {
    apiAuthHeaders: AuthHeaders
}

type ApiTestFixtures = {
    clientePage: ClientePage
    clienteSeed: ClienteCriado
    negativaSeedPreset: keyof typeof negativaPayloads
    negativaSeed: NegativaCriada
}

// Sessão de API autenticada uma única vez por worker, no mesmo espírito do
// "authState" em home.fixture.ts: evita repetir login REST a cada teste e
// evita corrida entre workers concorrentes.
const apiTest = base.extend<ApiTestFixtures, ApiWorkerFixtures>({
    apiAuthHeaders: [async ({ }, use) => {
        // Fixture "request" do Playwright é test-scoped; para autenticar uma
        // única vez por worker criamos nosso próprio APIRequestContext via a
        // API estática "request" (mesma ideia do "authState" em
        // home.fixture.ts, que abre seu próprio browser context).
        const context = await request.newContext()
        const headers = await authenticate(context)
        await context.dispose()

        await use(headers)
    }, { scope: 'worker' }],

    // Cria um cliente via GraphQL antes do teste e exclui depois, mesmo se o
    // teste falhar. Falha no teardown não deve mascarar falha do teste, por
    // isso só loga um aviso em vez de lançar.
    clienteSeed: async ({ request, apiAuthHeaders }, use) => {
        const payload = buildClientePayload()

        const created = await graphqlRequest<{ createCliente: ClienteCriado }>(
            request,
            apiAuthHeaders,
            CREATE_CLIENTE_MUTATION,
            { input: payload }
        )

        const cliente = created.createCliente

        await use(cliente)

        try {
            await graphqlRequest(request, apiAuthHeaders, DELETE_CLIENTE_MUTATION, { id: cliente.id })
        } catch (error) {
            console.warn(`Falha ao excluir cliente de teste (id: ${cliente.id}):`, error)
        }
    },

    // Opção: qual payload nomeado (test-data/negativaFactory.ts) o
    // negativaSeed deve usar. Default = 'generico' (payload sem overrides).
    // Specs que precisam de um payload específico (ex.: observação
    // identificável pra pesquisa) sobrescrevem com
    // test.use({ negativaSeedPreset: 'paraExclusao' }).
    // Guarda o NOME (string), não a função geradora — o Playwright trata um
    // valor de fixture-opção que seja uma função como se fosse a própria
    // função de setup da fixture (2 parâmetros + use()), então uma função
    // solta aqui quebra com "use() was not called".
    negativaSeedPreset: ['generico', { option: true }],

    // Cria uma negativa via GraphQL antes do teste e exclui depois. Usado por
    // testes cujo foco não é o cadastro em si (ex.: exclusão, edição) —
    // criar via API é mais rápido do que passar pelo formulário na UI.
    // Se o próprio teste já excluir o registro via UI (caso do teste de
    // exclusão), a tentativa de excluir de novo aqui simplesmente falha e só
    // gera um aviso, sem mascarar o resultado do teste.
    // Create/delete ficam centralizados em Negativas (pages/negativasPage.ts)
    // — único lugar a manter se a mutation/schema mudar. "testInfo" (3º
    // parâmetro, fornecido pelo próprio Playwright) embute o nome do teste
    // atual na observação gerada — ver test-data/negativaFactory.ts.
    negativaSeed: async ({ page, negativaSeedPreset }, use, testInfo) => {
        const negativas = new Negativas(page)
        const overrides = negativaPayloads[negativaSeedPreset](testInfo)
        const negativa = await negativas.createNegativa(overrides)

        await use(negativa)

        try {
            await negativas.deleteNegativa(negativa.id)
        } catch (error) {
            console.warn(`Falha ao excluir negativa de teste (id: ${negativa.id}):`, error)
        }
    },

    clientePage: async ({ page }, use) => {
        await use(new ClientePage(page))
    },
})

export const test = mergeTests(homeTest, apiTest)
export { expect }
