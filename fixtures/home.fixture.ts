import { test as base, expect } from '@playwright/test'

import { AuthService } from '../services/auth.service'
import { HomePage } from '../pages/homePage'

type HomeFixtures = {
    homePage: HomePage
}

export const test = base.extend<HomeFixtures>({
    // Executada antes de a fixture page criar e navegar pela aplicação 
    context: async ({ context }, use) => {
        await AuthService.restoreSessionStorage(context)
        await use(context)
    },

    // Disponibiliza HomePage já autenticada para os testes
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await page.goto('/')
        await homePage.waitUntilLoaded()
        await use(homePage)
    }
})

export { expect } 