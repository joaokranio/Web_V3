import { Locator, Page } from '@playwright/test'

export class Pesquisa {
    readonly page: Page

    // Locators
    readonly campoBusca: Locator
    // readonly botaoBuscar: Locator
    readonly botaoLimparFiltro: Locator

    constructor(page: Page) {
        this.page = page

        // Locators
        this.campoBusca = page.locator('input.p-inputtext')
        // this.botaoBuscar = page.locator('...')
        this.botaoLimparFiltro = page.locator('div.flex.gap-2').locator('button.p-button.p-button-secondary')
    }

}
