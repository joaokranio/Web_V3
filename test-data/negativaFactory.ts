import { NegativaPayload } from '../api/queries/negativa'

function unique(): string {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`
}

// Gera uma negativa com observação única a cada chamada (evita colisão
// quando os testes rodam em paralelo) e prefixada com "AUTOMACAO_" para
// facilitar identificar/limpar manualmente registros que escaparem do
// teardown automático. vendedorId/negativaMotivoId/clienteId usam os mesmos
// códigos já usados nos testes de UI (1) — ajustar se precisar de IDs reais
// de outras entidades.
export function buildNegativaPayload(overrides: Partial<NegativaPayload> = {}): NegativaPayload {
    return {
        vendedorId: 1,
        negativaMotivoId: 1,
        clienteId: 1,
        observacao: `AUTOMACAO_TESTE_${unique()}`,
        insertDate: new Date().toISOString(),
        insertName: 'SECTRA',
        latitude: 0,
        longitude: 0,
        ...overrides,
    }
}
