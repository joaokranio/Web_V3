import 'dotenv/config'

function getEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined || value === '') {
    throw new Error(`Variável de ambiente ${name} não definida`)
  }
  return value
}

export const ENV = {
  USER: getEnv('USER_ADMIN'),
  PASSWORD: getEnv('PASSWORD_ADMIN'),
  BASE_URL: getEnv('BASE_URL'),
  API_URL: getEnv('API_URL'),
  AUTH_FILE: 'playwright/.auth/auth.json',
  SESSION_FILE: 'playwright/.auth/session.json',
  HEADLESS: getEnv('HEADLESS') === 'true',
}