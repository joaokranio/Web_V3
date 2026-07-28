import { test, expect } from '../fixtures/home.fixture'
import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'


// test.beforeEach(async ({ page }) => {
//     const login = new LoginPage(page)
//     await login.login()
// })

// test.beforeEach(async ({ page }) => {
//     console.log('\n========== BEFORE EACH ==========')

//     const cookies = await page.context().cookies()

//     const refreshToken = cookies.find(c => c.name === 'refreshToken')

//     console.log('RefreshToken encontrado:', !!refreshToken)

//     if (refreshToken) {
//         console.log('Domínio:', refreshToken.domain)
//         console.log('Expira:', new Date(refreshToken.expires * 1000))
//     }

//     await page.goto('/#/dashboard')

//     console.log('URL após goto:', page.url())

//     const localStorageData = await page.evaluate(() => {
//         const data: Record<string, string> = {}

//         for (let i = 0; i < localStorage.length; i++) {
//             const key = localStorage.key(i)!

//             data[key] = localStorage.getItem(key)!
//         }

//         return data
//     })

//     console.log('LocalStorage:', localStorageData)
// })

test('Verificar se o usuário está logado', async ({ page }) => {
    const home = new HomePage(page)
    await page.waitForTimeout(2000)

    // Dado que o usuário está em qualquuer tela do sistema
    await page.goto('/#/indicadores')
    await page.waitForTimeout(2000)
    // await expect(home.pageHeader).toHaveText('Indicadores')

    // Quando o usuário clicar no icone do "Home"
    await home.menuHome.click()

    // Então o sstema deve redirecionar o usuário para a tela inicial 
    // await expect(home.pageHeader).toHaveText('Dashboard')
})

test('Abrir menu "Clientes"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/indicadores')

    // Quando clico no menu "clientes"
    await home.menuComercial.click()
    await home.menuClientes.click()

    // Então devo ser redirecionado para a tela de clientes
    await page.waitForTimeout(2000)

})

test('Abrir menu "Pedidos de Venda"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/indicadores')

    // Quando clico no menu "Pedidos de Vendas"
    await home.menuComercial.click()
    await home.menuPedidosVendas.click()

    // Então devo ser redirecionado para a tela de Pedidos de Vendas
    await page.waitForTimeout(2000)

})

test('Abrir menu "Negativas"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/indicadores')

    // Quando clico no menu "Negativas"
    await home.menuComercial.click()
    await home.menuNegativas.click()

    // Então devo ser redirecionado para a tela de Negativas
    await page.waitForTimeout(2000)

})

test('Abrir menu "Pedidos de Compra"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/indicadores')

    // Quando clico no menu "Pedidos de Compra"
    await home.menuCompras.click()
    await home.menuPedidosCompra.click()

    // Então devo ser redirecionado para a tela de pedido de compra 
    await page.waitForTimeout(2000)

})

test('Abrir menu "Lista de Materiais"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/indicadores')

    // Quando clico no menu "Lista de Materiais"
    await home.menuMateriais.click()
    await home.menuListaMateriais.click()

    // Então devo ser redirecionado para a tela da Lista de materias
    await page.waitForTimeout(2000)

})

test('Abrir menu "Indicadores"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico no menu "Lista de Materiais"
    await home.menuIndicadores.click()

    // Então devo ser redirecionado para a tela da Lista de materias
    await page.waitForTimeout(2000)

})

test('Abrir menu "Configurações"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico no menu "Configurações"
    await home.menuSuperior.click()
    await home.menuConfiguracoes.click()

    // Então devo ser redirecionado para a tela de configurações do Sistema
    await page.waitForTimeout(2000)

})

test('Abrir menu "Diagnostico"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico no menu "Diagnostico"
    await home.menuSuperior.click()
    await home.menuDiagnostico.click()

    // Então devo ser redirecionado para a tela de diagnostico do Sistema
    await page.waitForTimeout(2000)

})

test('Abrir menu "Trocar Filial"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico no menu "Trocar Filial"
    await home.menuSuperior.click()
    await home.menuTrocarFilial.click()

    // Então devo ser redirecionado para a tela para selecionar a filial
    await page.waitForTimeout(2000)

})

test('Abrir menu "Sobre o Sistema"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico no menu "Sobre o Sistema"
    await home.menuSuperior.click()
    await home.menuTrocarFilial.click()

    // Então devo ser redirecionado para a tela com informações Sobre o Sistema
    await page.waitForTimeout(2000)

})

test('Abrir menu "Modo Escuro"', async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico na Switch do "Modo Escuro" deixando na posição "Ativa"
    await home.menuSuperior.click()
    await home.menuDark.click()

    // Então a tela do sistema deverá assumir o modo escuro(dark)
    await page.waitForTimeout(2000)

})

test('Abrir menu "Sair"',{tag:['@Critical']}, async ({ page }) => {
    const home = new HomePage(page)

    // Dado que estou na homepage
    await page.goto('/#/dashboard')

    // Quando clico no menu "Sobre o Sistema"
    await home.menuSuperior.click()
    await home.menuSair.click()

    // Então devo ser redirecionado para a tela de login do Sistema
    await page.waitForTimeout(2000)

})

// test('xxxx',async({page})=>{

//     // Dado que

//     // Quando

//     // Então

// })