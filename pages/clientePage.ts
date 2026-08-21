import { Locator, Page } from '@playwright/test'
import { Grid } from '../components/grid'

export class ClientePage {
    readonly page: Page

    // Genéricos
    readonly topo: Locator

    // Grid — mecânica genérica (ordenar, filtrar, ler valores, mensagem de
    // vazio) fica em Grid; aqui só os locators específicos desta tela
    readonly grid: Grid

    // Colunas grid
    readonly colCategoria: Locator
    readonly colCkAtivo: Locator
    readonly colFilial: Locator
    readonly colStFinanceira: Locator
    readonly colStComercial: Locator
    readonly colStQualidade: Locator
    readonly colCodigo: Locator
    readonly colRazao: Locator
    readonly colFantasia: Locator
    readonly colTpPessoa: Locator
    readonly colCNPJ: Locator
    readonly colIE: Locator
    readonly colCPF: Locator
    readonly colRG: Locator
    readonly colEndereco: Locator
    readonly colComplemento: Locator
    readonly colNumero: Locator
    readonly colBairro: Locator
    readonly colCidade: Locator
    readonly colCEP: Locator
    readonly colUF: Locator
    readonly colVendedor: Locator
    readonly colRegiao: Locator
    readonly colDtCadastro: Locator
    readonly colContato: Locator
    readonly colFone1: Locator
    readonly colFone2: Locator
    readonly colEmail: Locator
    readonly colOrigem: Locator
    readonly colListaPreco: Locator
    readonly colCondPgto: Locator
    readonly colTpPgto: Locator

    constructor(page: Page) {
        this.page = page

        // Genéricos
        this.topo = page.locator('span.text-primary' , { hasText: 'Clientes' })

        // Grid
        this.grid = new Grid(page)

        // Colunas grid
        this.colCategoria = page.getByText('Categoria', {exact:true})
        this.colCkAtivo = page.getByText('Ck. At.', {exact:true})
        this.colFilial = page.getByText('Fl.', {exact:true})
        this.colStFinanceira = page.getByText('Situação Financeira', {exact:true})
        this.colStComercial = page.getByText('Situação Comerecial', {exact:true})
        this.colStQualidade = page.getByText('Situação Qualidade', {exact:true})
        this.colCodigo = page.getByText('Código', {exact:true})
        this.colRazao = page.getByText('Razão Social', {exact:true})
        this.colFantasia = page.getByText('Fantasia', {exact:true})
        this.colTpPessoa = page.getByText('Física/Jurídica', {exact:true})
        this.colCNPJ = page.getByText('CNPJ', {exact:true})
        this.colIE = page.getByText('IE', {exact:true})
        this.colCPF = page.getByText('CPF', {exact:true})
        this.colRG = page.getByText('RG', {exact:true})
        this.colEndereco = page.getByText('Endereço', {exact:true})
        this.colComplemento = page.getByText('Complemento', {exact:true})
        this.colNumero = page.getByText('Número', {exact:true})
        this.colBairro = page.getByText('Bairro', {exact:true})
        this.colCidade = page.getByText('Cidade', {exact:true})
        this.colCEP = page.getByText('CEP', {exact:true})
        this.colUF = page.getByText('UF', {exact:true})
        this.colVendedor = page.getByText('Vendedor', {exact:true})
        this.colRegiao = page.getByText('Região', {exact:true})
        this.colDtCadastro = page.getByText('Dt. Cadastro', {exact:true})
        this.colContato = page.getByText('Contato', {exact:true})
        this.colFone1 = page.getByText('Fone (1)', {exact:true})
        this.colFone2 = page.getByText('Fone (2)', {exact:true})
        this.colEmail = page.getByText('E-mail', {exact:true})
        this.colOrigem = page.getByText('Origem', {exact:true})
        this.colListaPreco = page.getByText('Lista Preço', {exact:true})
        this.colCondPgto = page.getByText('Cond. Pagto.', {exact:true})
        this.colTpPgto = page.getByText('Tp. Pagamento', {exact:true})
    
    }

}