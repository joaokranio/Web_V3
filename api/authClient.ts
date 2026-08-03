import { APIRequestContext } from '@playwright/test'
import { ENV } from '../config/env'

export type AuthHeaders = Record<string, string>

// TODO: paths e payloads abaixo são placeholders. Capturar os endpoints reais
// (login REST e seleção de filial) via aba de rede do navegador durante um
// login manual e substituir aqui antes de usar esta camada de verdade.
const LOGIN_PATH = '/auth/login'
const SELECT_FILIAL_PATH = '/auth/filial'

export async function authenticate(request: APIRequestContext): Promise<AuthHeaders> {
    const loginResponse = await request.post(`${ENV.API_URL}${LOGIN_PATH}`, {
        data: {
            usuario: ENV.USER,
            senha: ENV.PASSWORD,
        },
    })

    if (!loginResponse.ok()) {
        throw new Error(`Falha no login REST (${loginResponse.status()}): ${await loginResponse.text()}`)
    }

    const { token } = await loginResponse.json()

    const filialResponse = await request.post(`${ENV.API_URL}${SELECT_FILIAL_PATH}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {}, // TODO: id da filial a selecionar
    })

    if (!filialResponse.ok()) {
        throw new Error(`Falha ao selecionar filial (${filialResponse.status()}): ${await filialResponse.text()}`)
    }

    const { token: filialToken } = await filialResponse.json()

    return { Authorization: `Bearer ${filialToken}` }
}
