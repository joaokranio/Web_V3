
import fs from 'fs'
import path from 'path'
import { chromium, type BrowserContext, type Page } from '@playwright/test'

import { ENV } from '../config/env'
import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'

type SessionStorageData = Record<string, string>

export class AuthService {
    public static async initialize(): Promise<void> {
        if (!this.storageStateExists()) {
            await this.login()
            return
        }
        const sessionValid = await this.validateSession()
        if (sessionValid) {
            return
        }
        this.removeStorageState()
        await this.login()
    }

    // Restaura o SessionStorage antes de a aplicação carregar
    // A Fixture também utiliza esse metodo
    public static async restoreSessionStorage(context: BrowserContext): Promise<void> {
        if (!fs.existsSync(ENV.SESSION_FILE)) {
            return
        }
        const storage = JSON.parse(fs.readFileSync(ENV.SESSION_FILE, 'utf-8')) as SessionStorageData
        const origin = new URL(ENV.BASE_URL).origin

        await context.addInitScript(({ saveStorage, applicationOrigin }) => {
            if (window.location.origin !== applicationOrigin) {
                return
            }
            for (const [key, value] of Object.entries(saveStorage)) {
                window.sessionStorage.setItem(key, value)
            }
        },
            {
                saveStorage: storage,
                applicationOrigin: origin
            }
        )
    }

    private static storageStateExists(): boolean {
        return fs.existsSync(ENV.AUTH_FILE)
        return fs.existsSync(ENV.SESSION_FILE)

    }

    private static async validateSession(): Promise<boolean> {
        const browser = await chromium.launch({ headless: ENV.HEADLESS })

        try {
            const context = await browser.newContext({ storageState: ENV.AUTH_FILE })
            await this.restoreSessionStorage(context)
            const page = await context.newPage()
            await page.goto(ENV.BASE_URL)
            const homePage = new HomePage(page)
            return await homePage.isLoaded()
        } finally {
            await browser.close()
        }
    }

    private static async login(): Promise<void> {
        const browser = await chromium.launch({ headless: ENV.HEADLESS })

        try {
            fs.mkdirSync(path.dirname(ENV.AUTH_FILE), { recursive: true })
            const context = await browser.newContext()
            const page = await context.newPage()

            const loginPage = new LoginPage(page)
            const homePage = new HomePage(page)

            await loginPage.login()
            await homePage.waitUntilLoaded()

            await context.storageState({ path: ENV.AUTH_FILE })
            await this.saveSessionStorage(page)
        } finally {
            await browser.close()
        }
    }

    private static async saveSessionStorage(page: Page): Promise<void> {
        const storage = await page.evaluate(() => {
            return JSON.stringify(window.sessionStorage)
        })
        fs.writeFileSync(ENV.SESSION_FILE, storage, 'utf-8')
    }

    private static removeStorageState(): void {
        for (const file of [ENV.AUTH_FILE, ENV.SESSION_FILE]) {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            }
        }
    }
}