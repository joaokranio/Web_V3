import { Locator, Page } from '@playwright/test'
import { Grid } from '../components/grid'

export class ClientePage {
    readonly page: Page

    // Genéricos
    readonly topo: Locator

    // Grid — mecânica genérica (ordenar, filtrar, ler valores, mensagem de
    // vazio) fica em Grid; aqui só os locators específicos desta tela
    readonly grid: Grid

    // MSG Campos Obrigatórios 
    readonly msgRazaoObrigatorio: Locator
    readonly msgFantasiaObrigatorio: Locator
    readonly msgCategoriaObrigatorio: Locator
    readonly msgRegimeObrigatorio: Locator
    readonly msgPaisObrigatorio: Locator

    // Abas de navegação
    readonly abaGeral: Locator
    readonly abaOcorrencia: Locator
    readonly abaContasReceber: Locator
    readonly abaEndereco: Locator
    readonly abaCobranca: Locator
    readonly abaEntrega: Locator
    readonly abaFinanceiro: Locator
    readonly abaFrete: Locator
    readonly abaLinhaNegocio: Locator
    readonly abaObservacoes: Locator

    // Campos
    readonly razao:Locator
    readonly fantasia:Locator
    readonly categoria:Locator
    readonly regimeTributario:Locator
    readonly pais:Locator


    constructor(page: Page) {
        this.page = page

        // Genéricos
        this.topo = page.locator('span.text-primary' , { hasText: 'Clientes' })

        // Grid
        this.grid = new Grid(page)

        // MSG Campos Obrigatórios 
        this.msgRazaoObrigatorio = page.locator('div.col-span-12', {hasText:'Razão Social'}).locator('div.p-message')
        this.msgFantasiaObrigatorio = page.locator('div.col-span-12', {hasText:'Fantasia'}).locator('div.p-message')
        this.msgCategoriaObrigatorio = page.locator('div.col-span-12', {hasText:'Categoria'}).locator('div.p-message')
        this.msgRegimeObrigatorio = page.locator('div.col-span-12', {hasText:'Regime Tributário'}).locator('div.p-message')
        this.msgPaisObrigatorio = page.locator('div.col-span-12', {hasText:'País'}).locator('div.p-message')

        // Abas de Navegação
        this.abaGeral = page.getByText('Geral', {exact:true})
        this.abaOcorrencia = page.getByText('Geral', {exact:true})
        this.abaContasReceber = page.getByText('Geral', {exact:true})
        this.abaEndereco = page.getByText('Geral', {exact:true})
        this.abaCobranca = page.getByText('Geral', {exact:true})
        this.abaEntrega = page.getByText('Geral', {exact:true})
        this.abaFinanceiro = page.getByText('Geral', {exact:true})
        this.abaFrete = page.getByText('Geral', {exact:true})
        this.abaLinhaNegocio = page.getByText('Geral', {exact:true})
        this.abaObservacoes = page.getByText('Geral', {exact:true})

        // Campos 
        this.razao = page.locator('#cliente-input-razao')
        this.fantasia = page.locator('#cliente-input-fantasia')
        this.categoria = page.locator('#cliente-categoria-lookup-id')
        this.regimeTributario = page.locator('#cliente-regime-tributario-lookup-id')
        this.pais = page.locator('#cliente-endereco-pais-lookup-id')

   
    }

}