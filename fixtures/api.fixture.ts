import { test as base, mergeTests, request } from '@playwright/test'
import { test as homeTest, expect } from './home.fixture'
import { authenticate, AuthHeaders } from '../api/authClient'
import { graphqlRequest } from '../api/graphqlClient'
import { CREATE_CLIENTE_MUTATION, DELETE_CLIENTE_MUTATION, ClienteCriado } from '../api/queries/cliente'
import { buildClientePayload } from '../test-data/clienteFactory'

type ApiWorkerFixtures = {
    apiAuthHeaders: AuthHeaders
}

type ApiTestFixtures = {
    clienteSeed: ClienteCriado
}

// Sessão de API autenticada uma única vez por worker, no mesmo espírito do
// "authState" em home.fixture.ts: evita repetir login REST a cada teste e
// evita corrida entre workers concorrentes.
const apiTest = base.extend<ApiTestFixtures, ApiWorkerFixtures>({
    apiAuthHeaders: [async ({}, use) => {
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
})

export const test = mergeTests(homeTest, apiTest)
export { expect }
