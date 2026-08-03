import { APIRequestContext } from '@playwright/test'
import { ENV } from '../config/env'
import { AuthHeaders } from './authClient'

// TODO: confirmar o path real do endpoint GraphQL (ex.: "/graphql").
const GRAPHQL_PATH = '/graphql'

type GraphqlResponse<T> = {
    data?: T
    errors?: { message: string }[]
}

export async function graphqlRequest<T>(
    request: APIRequestContext,
    headers: AuthHeaders,
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    const response = await request.post(`${ENV.API_URL}${GRAPHQL_PATH}`, {
        headers,
        data: { query, variables },
    })

    if (!response.ok()) {
        throw new Error(`Requisição GraphQL falhou (${response.status()}): ${await response.text()}`)
    }

    const body: GraphqlResponse<T> = await response.json()

    if (body.errors?.length) {
        throw new Error(`Erro(s) GraphQL: ${body.errors.map(e => e.message).join('; ')}`)
    }

    if (!body.data) {
        throw new Error('Resposta GraphQL sem "data" e sem "errors".')
    }

    return body.data
}
