import { expect, test } from '../fixtures/api.fixture'
import { Negativas } from '../pages/negativasPage'
import { Pesquisa } from '../components/pesquisa'
import { BotoesGrid } from '../components/botoesGrid'
import { Toast } from '../components/toast'
import { validarDataAtual, aguardarLookupsPreenchidos } from '../components'

test.beforeEach(async ({ page }) => {
    const negativas = new Negativas(page)
    await page.goto('/#/comercial/negativas')
    await expect(negativas.topo).toBeVisible()
})

test.describe('Validação Grid', () => {
    test('Validar o funcionamento da pesquisa geral', { tag: ['@smoke', '@negativas'] }, async ({ page, negativaSeed }) => {
        const pesquisa = new Pesquisa(page)
        const negativas = new Negativas(page)

        // Dado que estou na tela de negativas
        await expect(negativas.topo).toBeVisible()

        // Quando faço uma pesquisa usnado o filtro geral
        await pesquisa.campoBusca.fill(negativaSeed.id)

        // Então o sistema deverá exibir na grid somente os registros que correspondem a pesquisa realizada
        await page.waitForTimeout(2000)
        await negativas.deleteNegativa(negativaSeed.id)

    })

    test('Validar o funcionamento do botão "limpar filtro"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const pesquisa = new Pesquisa(page)
        const negativas = new Negativas(page)
        const message = "Nenhum registro encontrado"

        // Dado que fiz uma pesquisa usando o filtro da pesquisa geral
        await pesquisa.campoBusca.fill('amafagafo')
        await expect(negativas.gridMessage).toHaveText(message)


        // Quando clico no botão "Limpar Filtro"
        await pesquisa.botaoLimparFiltro.click()

        // Então a pesquisa deverá ser resetada e a grid recarregada com todas as informações 
        await expect(negativas.gridMessage).not.toBeVisible()

    })

    test('Validar o funcionamento do botão "Inserir"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)

        // Dado que estou na tela de Negativas 
        await expect(negativas.topo).toBeVisible()

        // Quando clico no botão inserir 
        await botoesGrid.botaoInserir.click()

        // Então devo ser redirecionado para o formulário de preenchimento de Negativas 
        await expect(negativas.campoVendedor).toBeVisible()

    })
})

test.describe.skip('Validação comportamento colunas', () => {
    test('Validar a ordenação da coluna "Codigo"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Codigo"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Motivo"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Motivo"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Descrição(Motivo)"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Descrição(Motivo)"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Cliente"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Fantasia(Cliente)"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Fantasia(Cliente)"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Vendedor"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Vendedor"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Razão Social(Vendedor)"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Razão Social(Vendedor)"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar a ordenação da coluna "Observação"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

    test('Validar o funcionamento do filtro da coluna "Observação"', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {

        // Dado que 

        // Quando 

        // Então

    })

})

test.describe('Campos requeridos', () => {
    test('Validar a obrigatoriedade do campo "Vendedor"', { tag: ['@critical', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const message = "Por favor, preencha os campos obrigatórios."
        const message2 = "O campo é obrigatório."

        // Dado que não preenchi o campo "Vendedor"
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoMotivo.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando clico no botão "Salvar Alterações"
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então deverá ser exibido uma toast informando que o campo "Vendedor" é Requerido
        await expect(page.locator('.p-toast-message-text')).toBeVisible()
        await toast.toast(message)
        await expect(negativas.alerta.nth(0)).toHaveText(message2)
    })

    test('Validar a obrigatoriedade do campo "Motivo"', { tag: ['@critical', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const message = "Por favor, preencha os campos obrigatórios."
        const message2 = "O campo é obrigatório."

        // Dado que não preenchi o campo "Motivo"
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando clico no botão "Salvar Alterações"
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então deverá ser exibido uma toast informando que o campo "Motivo" é Requerido
        await expect(page.locator('.p-toast-message-text')).toBeVisible()
        await toast.toast(message)
        await expect(negativas.alerta.nth(0)).toHaveText(message2)

    })

    test('Validar a obrigatoriedade do campo "Cliente"', { tag: ['@critical', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const message = "Por favor, preencha os campos obrigatórios."
        const message2 = "O campo é obrigatório."

        // Dado que não preenchi o campo "Cliente"
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoMotivo.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando clico no botão "Salvar Alterações"
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então deverá ser exibido uma toast informando que o campo "Cliente" é Requerido
        await expect(page.locator('.p-toast-message-text')).toBeVisible()
        await toast.toast(message)
        await expect(negativas.alerta.nth(0)).toHaveText(message2)
    })


})

test.describe('Validação Inclusão', () => {
    test('Validar a inclusão de uma nova Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        const obs = `Teste de inclusão de negativa ${Date.now()}`
        const message = "Inserido com sucesso!"

        // Dado que estou na tela do formulário para o cadastro de negativas
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoMotivo.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill(obs)

        // Quando preencho todas as informações e clico no botão "Salvar Alterações"
        await validarDataAtual(negativas.campoDtCadastro)
        await aguardarLookupsPreenchidos(page)
        await botoesGrid.botaoSalvar.click()

        // Então o registro da Negativa deverá ser salvo
        await toast.toast(message)
        await expect(page.getByText(obs, { exact: true })).toBeVisible()

        // Deletar a negativa criada para não impactar outros testes
        await negativas.deleteNegativaPorObservacao(obs)
    })

    test('Validar o funcionamento do Botão "Cancelar" no cadastro de negativas', { tag: ['@smoke', '@negativas'] }, async ({ page }) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)

        // Dado que estou na tela do formulário para o cadastro de negativas 
        await botoesGrid.botaoInserir.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoVendedor.fill('1')
        await negativas.campoMotivo.fill('1')
        await negativas.campoCliente.fill('1')
        await negativas.campoObservacoes.fill('Teste de automatização')

        // Quando preencho todas as informações e clico no botão "Cancelar"
        await botoesGrid.botaoCancelar.click()

        // Então o registro da Negativa não deverá ser salvo
        await expect(page.locator('tr.p-datatable-selectable-row.p-row-even')).toHaveCount(1)

    })

})

test.describe.skip('Validação Exclusão', () => {
    // negativaSeed cria a negativa via API (setup rápido, já que aqui o que
    // importa é validar a exclusão pela UI, não o cadastro em si).
    test('Validar a exclusão de uma Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page, negativaSeed }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        const toast = new Toast(page)

        // Dado que existe uma Negativa cadastrada (via API, pelo negativaSeed)
        // localizo o registro na grid usando o id retornado pela busca
        // (o grid não tem um "código" separado — a coluna "Codigo" exibe o id)
        await pesquisa.campoBusca.fill(negativaSeed.id)

        // TODO: falta definir como a exclusão é acionada pela UI —
        // ex.: botão/ícone de exclusão na própria linha, menu de ações da
        // linha, ou seleção da linha + botão "Excluir" na toolbar? E existe
        // dialog de confirmação? Preencher os passos abaixo depois de eu
        // confirmar isso.

        // Quando acabar de identificar o registro e clico em excluir

        // Então o registro deverá ser removido da grid
        await expect(negativas.gridMessage).toBeVisible()
    })
})

test.describe.skip('Validação Edição', () => {
    // negativaSeed cria via API antes do teste e exclui via API depois —
    // aqui o foco é só validar a edição pela UI, então cadastro/exclusão
    // ficam fora do caminho crítico do teste (mesmo padrão do clienteSeed).
    test('Validar a edição de uma Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page, negativaSeed }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        const toast = new Toast(page)

        const novaObs = 'Teste de edição de negativa'

        // Dado que existe uma Negativa cadastrada (via API, pelo negativaSeed)
        // localizo o registro na grid usando o id retornado pela busca
        await pesquisa.campoBusca.fill(negativaSeed.id)

        // TODO: falta definir como se abre uma linha existente para edição
        // pela UI (clique na linha? ícone de editar?). Preencher depois de
        // confirmar isso.

        // Quando altero o campo "Observações" e salvo
        await negativas.campoObservacoes.fill(novaObs)

        // Então a alteração deverá ser persistida
    })
})
