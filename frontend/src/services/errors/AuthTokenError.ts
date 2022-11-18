export class AuthTokenError extends Error {
  constructor() {
    super('Erro com o Token de autenticação')
  }
}