import { expect, test } from '../fixtures/api.fixture'
import { Negativas } from '../pages/negativasPage'
import { Pesquisa } from '../components/pesquisa'
import { BotoesGrid } from '../components/botoesGrid'
import { Toast } from '../components/toast'
import { validarDataAtual, aguardarLookupsPreenchidos } from '../components'
import { negativaPayloads, MARCADOR_AUTOMACAO, identificarTeste } from '../test-data/negativaFactory'

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
    test('Validar a inclusão de uma nova Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page }, testInfo) => {
        const negativas = new Negativas(page)
        const botoesGrid = new BotoesGrid(page)
        const toast = new Toast(page)

        // Prefixo AUTOMACAO_ é obrigatório: deleteNegativaPorObservacao só
        // exclui registros marcados como criados pela automação (proteção
        // contra apagar dado alheio ao teste, ex.: do ERP) — sem o prefixo
        // a limpeza abaixo seria abortada e o registro ficaria órfão. O nome
        // do teste (via testInfo) embutido na observação ajuda a rastrear,
        // no ERP ou num trace, qual teste deixou o registro caso a limpeza
        // falhe.
        const obs = `${MARCADOR_AUTOMACAO}${identificarTeste(testInfo)}_${Date.now()}`
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

        const message = "Nenhum registro encontrado"

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
        await expect(negativas.gridMessage).toHaveText(message)

    })

})

test.describe('Validação Exclusão', () => {
    test.use({ negativaSeedPreset: 'paraExclusao' })
    test('Validar a exclusão de uma Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page, negativaSeed }) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        const toast = new Toast(page)
        const botoes = new BotoesGrid(page)

        const message = "Excluído com sucesso!"

        // Dado que existe uma Negativa cadastrada (via API, pelo negativaSeed)
        // localizo o registro na grid pela observação
        await pesquisa.campoBusca.fill(negativaSeed.observacao)
        await expect(page.locator('tr.p-datatable-selectable-row.p-row-even')).toHaveCount(1, { timeout: 5000 })

        // Confirma que a única linha retornada é de fato o registro que
        // criamos (não outro registro que a busca tenha casado por
        // engano) antes de acionar a exclusão — nunca excluir "o que
        // sobrou na grid", só o registro que sabemos ser nosso.
        await expect(page.getByText(negativaSeed.observacao, { exact: true })).toBeVisible()

        // Quando acabar de identificar o registro e clico em excluir
        await botoes.botaoAcao.click()
        await botoes.botaoExcluir.click()

        // Então o registro deverá ser removido da grid
        await toast.toast(message)
        await expect(page.getByText(negativaSeed.observacao, { exact: true })).not.toBeVisible()
    })
})

test.describe.skip('Validação Edição', () => {
    test.fixme('BUG-612 Azure | Validar a edição de uma Negativa no Sistema', { tag: ['@smoke', '@negativas'] }, async ({ page }, testInfo) => {
        const negativas = new Negativas(page)
        const pesquisa = new Pesquisa(page)
        const botoes = new BotoesGrid(page)

        const novaObs = `${MARCADOR_AUTOMACAO}${identificarTeste(testInfo)}_EDITADA_${Date.now()}`

        // Dado que existe uma Negativa cadastrada
        const negativa = await negativas.createNegativa(negativaPayloads.paraEdicao(testInfo))

        // localizo o registro na grid pela observação
        await pesquisa.campoBusca.fill(negativa.observacao)
        await expect(page.locator('tr.p-datatable-selectable-row.p-row-even')).toHaveCount(1)

        // Quando altero o campo "Observações" e salvo
        await botoes.botaoAcao.click()
        await botoes.botaoEditar.click()
        await expect(negativas.campoVendedor).toBeVisible()
        await negativas.campoObservacoes.fill(novaObs)
        await botoes.botaoSalvar.click()

        // Então a alteração deverá ser persistida
        await expect(page.getByText(novaObs, { exact: true })).toBeVisible()

        // Higienização
        await negativas.deleteNegativa(negativa.id)
    })
})
