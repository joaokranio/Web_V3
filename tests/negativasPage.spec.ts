import { expect, test } from '../fixtures/home.fixture'
import { Negativas } from '../pages/negativasPage'

test.beforeEach(async ({ page }) => {
    await page.goto('/#/comercial/negativas')
})

test.describe('Validação Grid', () => {
    test('Validar o funcionamento da pesquisa geral', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que estou na tela de negativas

        // Quando faço uma pesquisa usnado o filtro geral

        // Então o sistema deverá exibir na grid somente os registros que correspondem a pesquisa realizada


    })

    test('Validar o funcionamento do botão "limpar filtro"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que fiz uma pesquisa usando o filtro da pesquisa geral

        // Quando clico no botão "Limpar Filtro"

        // Então a pesquisa deverá ser resetada e a grid recarregada com todas as informações 

    })

    test('Validar o funcionamento do botão "Inserir"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que estou na tela de Negativas 

        // Quando clico no botão inserir 

        // Então devo ser redirecionado para o formulário de preenchimento de Negativas 

    })

})

test.describe('Validação comportamento colunas', () => {
    test('Validar a ordenação da coluna "Codigo"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Codigo"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Motivo"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Motivo"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Descrição(Motivo)"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Descrição(Motivo)"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Cliente"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Fantasia(Cliente)"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Fantasia(Cliente)"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Vendedor"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Vendedor"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Razão Social(Vendedor)"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Razão Social(Vendedor)"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Observação"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Observação"', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

})

test.describe('Campos requeridos', () => {
    test('Validar a obrigatoriedade do campo "Vendedor"',{tag:['@critical']}, async({page})=>{

        // Dado que não preenchi o campo "Vendedor"

        // Quando clico no botão "Salvar Alterações"

        // Então deverá ser exibido uma toast informando que o campo "Vendedor" é Requerido
    })

    test('Validar a obrigatoriedade do campo "Motivo"',{tag:['@critical']}, async({page})=>{

        // Dado que não preenchi o campo "Motivo"

        // Quando clico no botão "Salvar Alterações"

        // Então deverá ser exibido uma toast informando que o campo "Motivo" é Requerido

    })

    test('Validar a obrigatoriedade do campo "Cliente"',{tag:['@critical']}, async({page})=>{

        // Dado que não preenchi o campo "Cliente"

        // Quando clico no botão "Salvar Alterações"

        // Então deverá ser exibido uma toast informando que o campo "Cliente" é Requerido
    })


})

test.describe('Validação Inclusão', () => {
    test('Validar a inclusão de uma nova Negativa no Sistema', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que estou na tela do formulário para o cadastro de negativas 

        // Quando preencho todas as informações e clico no botão "Salvar Alterações"

        // Então o registro da Negativa deverá ser salvo 

    })

    test('Validar o funcionamento do Botão "Cancelar" no cadastro de negativas', { tag: ['@smoke'] }, async ({ page }) => {

        // Dado que estou na tela do formulário para o cadastro de negativas 

        // Quando preencho todas as informações e clico no botão "Cancelar"

        // Então o registro da Negativa não deverá ser salvo 

    })

})
