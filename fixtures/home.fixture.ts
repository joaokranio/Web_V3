import { test as base, expect, type BrowserContext } from '@playwright/test'

import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'

type HomeFixtures = {
    homePage: HomePage
}

type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>

type AuthState = {
    current: StorageState
}

type WorkerFixtures = {
    authState: AuthState
}

export const test = base.extend<HomeFixtures, WorkerFixtures>({
    // Login único por worker: cada worker autentica sua própria sessão uma
    // única vez. O storageState resultante é repassado (e atualizado a cada
    // teste, veja o fixture "context" abaixo) só dentro deste worker, em vez
    // de todos os testes carregarem o mesmo storageState estático de um
    // arquivo compartilhado. Isso evita que vários contextos concorrentes
    // consumam/rotacionem o mesmo refreshToken e derrubem a sessão uns dos
    // outros (antes, só o primeiro a "vencer" a corrida permanecia logado).
    authState: [async ({ browser }, use) => {
        const context = await browser.newContext()
        const page = await context.newPage()

        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)

        await loginPage.login()
        await homePage.waitUntilLoaded()

        const authState: AuthState = { current: await context.storageState() }

        await context.close()

        await use(authState)
    }, { scope: 'worker' }],

    // Contexto novo por teste (necessário para trace/screenshot/vídeo do
    // Playwright funcionarem normalmente), semeado com a sessão do worker.
    // Ao final do teste, o storageState é relido e guardado em "authState"
    // para o próximo teste do mesmo worker herdar qualquer rotação de token
    // que tenha ocorrido.
    context: async ({ browser, authState }, use) => {
        const context = await browser.newContext({ storageState: authState.current })
        await use(context)
        authState.current = await context.storageState()
        await context.close()
    },

    // Relogar somente se a sessão herdada estiver deslogada (ex.: o teste
    // anterior do mesmo worker era o de "Sair").
    page: async ({ context }, use) => {
        const page = await context.newPage()
        const homePage = new HomePage(page)

        await page.goto('/')

        if (!(await homePage.isLoaded())) {
            const loginPage = new LoginPage(page)
            await loginPage.login()
            await homePage.waitUntilLoaded()
        }

        await use(page)
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    }
})

export { expect }
