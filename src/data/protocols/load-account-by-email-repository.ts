import { AccountModel } from '../../domain/models/account'

export interface LoadAccountByEmailRepository {
  auth (email: string): Promise<AccountModel>
}
