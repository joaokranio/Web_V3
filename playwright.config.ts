import { defineConfig } from '@playwright/test'
import { ENV } from './config/env'

export default defineConfig({
    // Pasta onde ficam todos os arquivos de teste
    testDir: './tests',

    // Tempo máximo de execução de cada teste, em milissegundos
    timeout: 30000,

    // Em CI, tenta novamente até duas vezes.
    // Localmente, tenta novamente uma vez.
    retries: process.env.CI ? 2 : 1,

    // Usa metade dos processadores disponíveis para executar testes em paralelo
    workers: '50%',

    // Permite que testes de arquivos diferentes executem em paralelo
    fullyParallel: true,

    // Impede o uso acidental de test.only no CI
    forbidOnly: !!process.env.CI,

    // Gera relatório visual HTML e resultado estruturado em JSON
    reporter: [
        ['html']
        // ,['json', { outputFile: 'test-results/results.json' }]
    ],

    // Configurações aplicadas a todos os testes
    use: {
        // URL-base usada em page.goto('/')
        baseURL: ENV.BASE_URL,

        // Define se o navegador será visível durante a execução
        headless: ENV.HEADLESS,

        // Mantém trace somente quando ocorrer falha
        trace: 'retain-on-failure',

        // Salva imagem somente quando ocorrer falha
        screenshot: 'only-on-failure',

        // Mantém vídeo somente quando ocorrer falha
        video: 'retain-on-failure'
    },

    // Tempo máximo padrão para assertions com expect()
    expect: {
        timeout: 5000
    }
})