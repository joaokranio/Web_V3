import { Locator, Page } from '@playwright/test'

export class BotoesGrid {
    readonly page: Page

    // Locators
    readonly botaoInserir: Locator
    readonly botaoSalvar: Locator
    readonly botaoCancelar: Locator
    readonly botaoAcao: Locator
    readonly botaoEditar: Locator
    readonly botaoExcluir: Locator
    
        
    constructor(page: Page) {
        this.page = page

        // Locators
        this.botaoInserir = page.locator('button', {hasText:'Inserir'})
        this.botaoSalvar = page.locator('button', {hasText:'Salvar'})
        this.botaoCancelar = page.locator('button', {hasText:'Cancelar'})
        this.botaoAcao = page.locator('#action-menu-button')
        this.botaoEditar = page.locator('a', {hasText:'Editar'})
        this.botaoExcluir = page.locator('a', {hasText:'Excluir'})
        
        
    }

}
