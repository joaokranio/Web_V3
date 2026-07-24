import { AuthService } from '../services/auth.service'

// Executado uma vez antes de toda a suíte.
// Delega ao serviço a criação ou validação da sessão autenticada.
export default async function globalSetup(): Promise<void> {
    await AuthService.initialize()
}