import { Locator, Page } from '@playwright/test'

export class ClientePage {
    readonly page: Page

    // Cabeçalho pagina
    // readonly pageHeader: Locator

    constructor(page: Page) {
        this.page = page

        // Cabeçalho pagina
        // this.pageHeader = page.locator('span' , { hasText: 'Dashboard' })
    
    }

}