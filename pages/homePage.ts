import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page

    // Cabeçalho pagina
    readonly pageHeader: Locator

    constructor(page: Page) {
        this.page = page

        // Cabeçalho pagina
        this.pageHeader = page.locator('span' , { hasText: 'Dashboard' })
    }

    async waitUntilLoaded(): Promise<void> {
        await this.pageHeader.waitFor({ state: 'visible' })
    }
    async isLoaded(): Promise<boolean> {
        try {
            await this.pageHeader.waitFor({ state: 'visible', timeout: 5000 })
            return true
        } catch {
            return false
        }
    }

}