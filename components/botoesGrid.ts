import { Locator, Page } from '@playwright/test'

export class BotoesGrid {
    readonly page: Page

    // Locators
    readonly botaoInserir: Locator
    readonly botaoSalvar: Locator
    readonly botaoCancelar: Locator

    constructor(page: Page) {
        this.page = page

        // Locators
        this.botaoInserir = page.locator('button', {hasText:'Inserir'})
        this.botaoSalvar = page.locator('button', {hasText:'Salvar'})
        this.botaoCancelar = page.locator('button', {hasText:'Cancelar'})
    }

}
