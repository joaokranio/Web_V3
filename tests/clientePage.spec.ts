import { test } from '../fixtures/home.fixture'
import { ClientePage } from '../pages/clientePage'

// TODO: criar pages/clientePage.ts com os seletores reais do formulário de cadastro de clientes
// e components/toast.ts (já existente) para validar as mensagens de erro.

test.beforeEach(async ({ page }) => {
    await page.goto('/#/comercial/clientes')
})

test.describe.skip('Validação Campos Obrigatórios', () => {
    test('Validar obrigatoriedade do campo "Razão Social"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Razão Social" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Razão Social" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Fantasia"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Fantasia" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Fantasia" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Categoria"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Categoria" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Categoria" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "CNPJ"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "CNPJ" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "CNPJ" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "I.E."', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "I.E." do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "I.E." deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "CPF"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "CPF" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "CPF" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "RG"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "RG" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "RG" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "País"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "País" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "País" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "CEP"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "CEP" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "CEP" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Endereço"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Endereço" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Endereço" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Numero"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Numero" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Numero" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Bairro"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Bairro" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Bairro" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Cidade"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Cidade" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Cidade" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "UF"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "UF" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "UF" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "I.B.G.E."', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "I.B.G.E." do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "I.B.G.E." deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Região"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Região" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Região" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Atividade"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Atividade" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Atividade" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

    test('Validar obrigatoriedade do campo "Linha de Negócio"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que não preenchi o campo "Linha de Negócio" do formulario de cadastro de clientes

        // Quando clico no botão "Salvar Alterações"

        // Então o sistema deverá exibir um "Toast" com o texto "Por favor, preencha os campos obrigatórios."
        // E o campo "Linha de Negócio" deverá ficar vermelho e exibir uma mensagem abaixo do campo input "O campo é obrigatório".
    })

})

test.describe.skip('Validação TP Pessoa', () => {

    test('Validar a funcionalidade do tipo "Pessoa Juridica"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que estou na tela de cadastro de cliente

        // Quando preencher o tipo de pessoa

        // Então por padrão o sistema deve sugerir o tipo de pessoa como "Pessoa Jurídica" apresentando os campos "CNPJ" e "IE"
    })

    test('Validar a funcionalidade do tipo "Pessoa Física"', { tag: ['@critical', '@smoke', '@cadastro', '@clientes'] }, async () => {
        // Dado que estou na tela de cadastro de cliente

        // Quando seleciono tipo "Pessoa Física"

        // Então os campos "CNPJ" deverá ser substituido pelo campo "CPF"
        // E o campo "IE" deverá ser substituido pelo campo "RG"
    })

})

test.describe.skip('Validação Endereços', () => {

    // TODO: cenários ainda não documentados em wiki/clientepage.md

})

test.describe.skip('Validação Contato', () => {

    // TODO: cenários ainda não documentados em wiki/clientepage.md

})
