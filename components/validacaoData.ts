import { Locator, expect } from '@playwright/test'

// Valida se um campo/coluna que exibe uma data de cadastro corresponde à
// data atual do sistema. Genérico por design: recebe o locator de onde a
// data está (campo de formulário no momento do cadastro, célula da grid
// depois de salvo etc.) — funciona em qualquer tela que precise dessa
// validação (Negativas, Pedido, Cliente...), basta importar e passar o
// locator correspondente.
//
// Extrai a data (dd/mm/yyyy) de dentro do texto do locator em vez de exigir
// texto exato, pra funcionar mesmo se o campo tiver algo além da data pura
// (ex.: "Cadastrado em: 11/08/2026").
//
// @example
// import { validarDataAtual } from '../components/validacaoData'
//
// // validando no momento do cadastro (campo de formulário, ex.: <input>):
// await validarDataAtual(negativas.campoDtCadastro)
//
// // validando depois, na grid (célula da coluna "Data"):
// await validarDataAtual(page.locator('td.coluna-data').nth(0))
export async function validarDataAtual(locator: Locator): Promise<void> {
    const texto = await lerConteudo(locator)
    const dataExibida = texto.match(/\d{2}\/\d{2}\/\d{4}/)?.[0]

    const hoje = new Date()
    const dataAtual = [
        String(hoje.getDate()).padStart(2, '0'),
        String(hoje.getMonth() + 1).padStart(2, '0'),
        hoje.getFullYear(),
    ].join('/')

    expect(
        dataExibida,
        `Campo não contém uma data no formato dd/mm/yyyy (texto encontrado: "${texto}")`
    ).toBe(dataAtual)
}

// Campos de formulário (<input>/<textarea>/<select>) guardam o valor exibido
// no "value", não no texto do elemento — innerText() sempre devolve "" pra
// eles (foi exatamente esse o bug ao validar "Dt. Cadastro", um
// <input class="p-datepicker-input">). Tenta inputValue() primeiro; se o
// locator não for um elemento de formulário, o Playwright lança e cai pra
// innerText() (caso de célula de grid, span, etc.).
async function lerConteudo(locator: Locator): Promise<string> {
    try {
        return await locator.inputValue()
    } catch {
        return await locator.innerText()
    }
}
