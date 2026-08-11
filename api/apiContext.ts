import { APIRequestContext, request as playwrightRequest } from '@playwright/test'
import { authenticate, AuthHeaders } from './authClient'

type ApiContext = {
    request: APIRequestContext
    headers: AuthHeaders
}

// Autentica uma única vez por processo de worker e reaproveita em todas as
// chamadas de API dos Page Objects (Negativas.createNegativa/deleteNegativa
// etc.) — assim quem chama esses métodos não precisa passar "request"/
// "apiAuthHeaders" a cada vez nem lembrar de instanciar a classe com eles.
// Mesma ideia do fixture "apiAuthHeaders" (fixtures/api.fixture.ts), só que
// acessível fora do ciclo de fixtures do Playwright.
let cached: Promise<ApiContext> | null = null

// @example
// // dentro de um método de API de um Page Object novo (ex.: ClientePage):
// const { request, headers } = await getApiContext()
// await graphqlRequest(request, headers, MinhaQuery.CREATE, { ... })
export function getApiContext(): Promise<ApiContext> {
    if (!cached) {
        cached = (async () => {
            const context = await playwrightRequest.newContext()
            const headers = await authenticate(context)
            return { request: context, headers }
        })()
    }
    return cached
}
