import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page

    // Cabeçalho pagina
    readonly pageHeader: Locator

    // Menu lateral
    readonly menuHome: Locator
    readonly menuComercial: Locator
    readonly menuClientes: Locator
    readonly menuPedidosVendas: Locator
    readonly menuNegativas: Locator
    readonly menuCompras: Locator
    readonly menuPedidosCompra: Locator
    readonly menuMateriais: Locator
    readonly menuListaMateriais: Locator
    readonly menuIndicadores: Locator
    
    // Menu superior
    readonly menuSuperior: Locator
    readonly menuUser: Locator
    readonly menuConfiguracoes: Locator
    readonly menuDiagnostico: Locator
    readonly menuTrocarFilial: Locator
    readonly menuSobre: Locator
    readonly menuDark: Locator
    readonly menuSair: Locator


    constructor(page: Page) {
        this.page = page

        // Cabeçalho pagina
        this.pageHeader = page.locator('span' , { hasText: 'Dashboard' })
        // this.pageHeader = page.locator('span.text-primary')

        // Menu lateral
        this.menuHome = page.getByTitle('Página Inicial')
        this.menuComercial = page.getByTitle('Comercial')
        this.menuClientes = page.getByTitle('Clientes')
        this.menuPedidosVendas = page.getByTitle('Pedidos de Venda')
        this.menuNegativas = page.getByTitle('Negativas')
        this.menuCompras = page.getByTitle('Compras')
        this.menuPedidosCompra = page.getByTitle('Pedidos de Compra')
        this.menuMateriais = page.getByTitle('Materiais',{exact:true})
        this.menuListaMateriais = page.getByTitle('Lista de Materiais')
        this.menuIndicadores = page.getByTitle('Indicadores')
        
        // Menu superior
        this.menuSuperior = page.locator('button.app-logged-user')
        this.menuUser = page.locator('span.app-logged-user-name')
        this.menuConfiguracoes = page.getByText('Configurações', {exact:true})
        this.menuDiagnostico = page.getByText('Diagnóstico',{exact:true})
        this.menuTrocarFilial = page.getByText('Trocar Filial', {exact:true})
        this.menuSobre = page.getByText('Sobre o Sistema', {exact:true})
        this.menuDark = page.locator('input.p-toggleswitch-input')
        this.menuSair = page.getByText('Sair', {exact:true})
        
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