import { APIRequestContext } from '@playwright/test'
import { ENV } from '../config/env'

export type AuthHeaders = Record<string, string>

// Endpoints confirmados via captura de rede (tests/_debug-network.spec.ts)
// durante um login real feito pela UI. Fluxo: login -> lista filiais ->
// troca para a primeira filial (mesmo comportamento de
// LoginPage.selecionarFilial(), que sempre escolhe "#filiais_0").
const LOGIN_PATH = '/api/auth/login'
const FILIAIS_PATH = '/api/auth/filiais'
const TROCAR_FILIAL_PATH = '/api/auth/trocar-filial'

type Filial = { id: number; nome: string }

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

    const { accessToken } = await loginResponse.json()

    const filiaisResponse = await request.get(`${ENV.API_URL}${FILIAIS_PATH}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!filiaisResponse.ok()) {
        throw new Error(`Falha ao listar filiais (${filiaisResponse.status()}): ${await filiaisResponse.text()}`)
    }

    const filiais: Filial[] = await filiaisResponse.json()
    const primeiraFilial = filiais[0]

    const trocarFilialResponse = await request.post(`${ENV.API_URL}${TROCAR_FILIAL_PATH}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { filialId: primeiraFilial.id },
    })

    if (!trocarFilialResponse.ok()) {
        throw new Error(`Falha ao trocar filial (${trocarFilialResponse.status()}): ${await trocarFilialResponse.text()}`)
    }

    const { accessToken: tokenComFilial } = await trocarFilialResponse.json()

    return { Authorization: `Bearer ${tokenComFilial}` }
}
