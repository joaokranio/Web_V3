import { Locator, Page } from '@playwright/test'

export class Negativas {
    readonly page : Page
    // Genéricos
    readonly test: Locator

    constructor(page:Page) {
        this.page = page

        // Genéricos
        this.test = page.locator('span')
    }
}