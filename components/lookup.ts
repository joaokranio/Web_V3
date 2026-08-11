import { Page, expect } from '@playwright/test'

// Campos "lookup" (Vendedor, Motivo, Cliente, etc.) são um par de <input>: um
// onde se digita o código e, ao lado, um <input disabled> que o sistema
// preenche de forma assíncrona com a descrição correspondente ao código
// (ex.: código "1" no Motivo -> "Cliente abastecido"). Clicar em "Salvar"
// antes dessa resolução terminar causa erro/cadastro incompleto — daqui a
// necessidade de esperar por ela sem usar um timeout fixo.
//
// Genérico por design: varre a tela procurando todo input cujo id termine em
// "-lookup-id" (convenção usada em todo o sistema, confirmada em Negativas)
// e, para cada um que foi de fato preenchido, espera o <input disabled>
// logo ao lado (irmão imediato no DOM) deixar de estar vazio. Campos de
// lookup deixados vazios de propósito (ex.: teste de campo obrigatório) são
// ignorados — não há nada a resolver neles.
//
// @example
// import { aguardarLookupsPreenchidos } from '../components/lookup'
//
// await negativas.campoVendedor.fill('1')
// await negativas.campoMotivo.fill('1')
// await negativas.campoCliente.fill('1')
//
// await aguardarLookupsPreenchidos(page)
// await botoesGrid.botaoSalvar.click()
export async function aguardarLookupsPreenchidos(page: Page): Promise<void> {
    const camposCodigo = page.locator('input[id$="-lookup-id"]')
    const total = await camposCodigo.count()

    for (let i = 0; i < total; i++) {
        const campo = camposCodigo.nth(i)
        const valor = await campo.inputValue()
        if (!valor) continue // não preenchido (ex.: teste de campo obrigatório) — nada a esperar

        const campoResolvido = campo.locator('xpath=following-sibling::input[1]')
        await expect(campoResolvido).not.toHaveValue('')
    }
}
