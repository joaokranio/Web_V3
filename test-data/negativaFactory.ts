import { TestInfo } from '@playwright/test'
import { NegativaPayload } from '../api/queries/negativa'

function unique(): string {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`
}

// Marcador que identifica um registro como criado pela automação. Usado
// tanto pra gerar a observação (abaixo) quanto pra travar exclusões: a
// limpeza automática (pages/negativasPage.ts) só apaga um registro se a
// observação dele começar com esse prefixo — nunca um registro sem o
// marcador (ex.: cadastrado pelo ERP ou manualmente), mesmo que ele apareça
// como resultado de uma busca. Ver negativasPage.ts (buscarNegativaPorObservacao
// / deleteNegativaPorObservacao) pra onde a trava é aplicada.
export const MARCADOR_AUTOMACAO = 'AUTOMACAO_'

// Reduz o título do teste (ex.: "Validar a exclusão de uma Negativa no
// Sistema") a um slug curto e seguro pra embutir na observação: sem
// acento/pontuação, maiúsculo, truncado. Usado tanto pra rastrear qual teste
// deixou um registro órfão (busca no ERP pelo pedaço do título) quanto como
// evidência legível direto no trace/rede do Playwright, sem precisar cruzar
// com o relatório pra saber qual teste gerou aquele registro.
//
// @example
// const negativas = new Negativas(page)
// const negativa = await negativas.createNegativa({}, testInfo)
export function identificarTeste(testInfo: Pick<TestInfo, 'title'>): string {
    const semAcento = testInfo.title.normalize('NFD').replace(/\p{Diacritic}/gu, '')

    return semAcento
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 40)
}

// Gera uma negativa com observação única a cada chamada (evita colisão
// quando os testes rodam em paralelo), prefixada com o marcador de
// automação para facilitar identificar/limpar manualmente registros que
// escaparem do teardown automático. Passar o "testInfo" (segundo parâmetro
// do callback de todo teste do Playwright) embute o nome do teste na
// observação — permite descobrir qual teste deixou um registro órfão e serve
// de evidência no trace sem precisar cruzar com o relatório. vendedorId/
// negativaMotivoId/clienteId usam os mesmos códigos já usados nos testes de
// UI (1) — ajustar se precisar de IDs reais de outras entidades.
//
// @example
// const negativas = new Negativas(page)
// const negativa = await negativas.createNegativa({}, testInfo)
export function buildNegativaPayload(overrides: Partial<NegativaPayload> = {}, testInfo?: Pick<TestInfo, 'title'>): NegativaPayload {
    const origem = testInfo ? `${identificarTeste(testInfo)}_` : 'TESTE_'

    return {
        vendedorId: 1,
        negativaMotivoId: 1,
        clienteId: 1,
        observacao: `${MARCADOR_AUTOMACAO}${origem}${unique()}`,
        insertDate: new Date().toISOString(),
        insertName: 'SECTRA',
        latitude: 0,
        longitude: 0,
        ...overrides,
    }
}

// Payloads nomeados para testes que precisam localizar um cadastro
// específico depois de criado (ex.: editar/excluir pela UI). A pesquisa
// geral da grid (Pesquisa.campoBusca) parece casar por substring — buscar
// por um id/código curto (ex.: "64") pode coincidir por acaso com qualquer
// trecho de outro valor no banco (inclusive dentro do timestamp da
// observação genérica de outro teste), deixando a pesquisa flaky. Cada
// preset aqui tem uma observação longa, prefixada e única a cada chamada —
// busca por ela em vez de id/código. Todos exigem "testInfo" (segundo
// parâmetro do callback do teste) pra embutir o nome do teste na observação
// — ver buildNegativaPayload.
//
// @example
// const negativa = await negativas.createNegativa(negativaPayloads.paraEdicao(testInfo))
// await pesquisa.campoBusca.fill(negativa.observacao)
//
// Pra um cenário novo desse tipo, só acrescenta uma entrada aqui.
export const negativaPayloads = {
    generico: (testInfo: Pick<TestInfo, 'title'>): NegativaPayload => buildNegativaPayload({}, testInfo),
    paraEdicao: (testInfo: Pick<TestInfo, 'title'>): NegativaPayload => buildNegativaPayload({}, testInfo),
    paraExclusao: (testInfo: Pick<TestInfo, 'title'>): NegativaPayload => buildNegativaPayload({}, testInfo),
}
