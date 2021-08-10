import { DbAddAccount } from '../../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdaptarer = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()

  const dbAddAccount = new DbAddAccount(
    bcryptAdaptarer,
    accountMongoRepository
  )

  const signupController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation()
  )

  return new LogControllerDecorator(signupController, logMongoRepository)
}