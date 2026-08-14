import { Locator, Page } from '@playwright/test'

export class Pesquisa {
    readonly page: Page

    // Locators
    readonly campoBusca: Locator

    // readonly botaoBuscar: Locator
    readonly botaoLimparFiltro: Locator

    // Botões do pesquisar das colunas
    readonly botaoPesquisarX: Locator
    readonly botaoPesquisarAddRegra: Locator
    readonly botaoPesquisarRemoverRegra: Locator
    readonly botaoPesquisarOK: Locator
    
    // Campos Pesquisa Coluna
    readonly selectoPesquisa: Locator
    readonly inputPesquisa: Locator
    readonly inputPesquisaStr: Locator
    
    // Pesquisa tipo Numérico
    readonly nunIgual: Locator
    readonly nunNaoIgual: Locator
    readonly nunMenorQue: Locator
    readonly nunMenorIgual: Locator
    readonly nunMaiorQue: Locator
    readonly nunMaiorIgual: Locator
    
    // Pesquisa tipo String
    readonly strIgual: Locator
    readonly strComecaCom: Locator
    readonly strContem: Locator
    readonly strNaoContem: Locator
    readonly strTerminaCom: Locator
    readonly strNaoIgual: Locator


    constructor(page: Page) {
        this.page = page

        // Locators
        this.campoBusca = page.locator('input.p-inputtext')

        // this.botaoBuscar = page.locator('...')
        this.botaoLimparFiltro = page.locator('div.flex.gap-2').locator('button.p-button.p-button-secondary')

        // Botões do pesquisar
        this.botaoPesquisarX = page.locator('div.p-datatable-filter-overlay button.p-button-secondary')
        this.botaoPesquisarAddRegra = page.locator('div.p-datatable-filter-overlay button.p-datatable-filter-add-rule-button')
        this.botaoPesquisarRemoverRegra = page.locator('div.p-datatable-filter-overlay button.p-datatable-filter-remove-rule-button')
        this.botaoPesquisarOK = page.locator('div.p-datatable-filter-overlay button.p-button-success')
        
        // Campos Pesquisa coluna
        this.selectoPesquisa = page.locator('div.p-datatable-filter-rule-list span.p-select-label')
        this.inputPesquisa = page.locator('span.p-inputnumber-fluid input')
        this.inputPesquisaStr = page.locator('div.p-datatable-filter-rule input')
        
        // Pesquisa tipo Numérico
        this.nunIgual = page.getByText('É igual a', {exact:true})
        this.nunNaoIgual = page.getByText('Não é igual a', {exact:true})
        this.nunMenorQue = page.getByText('É menor que', {exact:true})
        this.nunMenorIgual = page.getByText('É menor ou igual a', {exact:true})
        this.nunMaiorQue = page.getByText('É maior que', {exact:true})
        this.nunMaiorIgual = page.getByText('É maior ou igual a', {exact:true})
        
        // Pesquisa tipo String
        this.strIgual = page.getByText('É igual a', {exact:true})
        this.strComecaCom = page.getByText('Começa com', {exact:true})
        this.strContem = page.getByText('Contém', {exact:true})
        this.strNaoContem = page.getByText('Não contém', {exact:true})
        this.strTerminaCom = page.getByText('Termina com', {exact:true})
        this.strNaoIgual = page.getByText('Não é igual a', {exact:true})

    }

}
