import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogErrorMongoRepository } from '../../infra/db/mongodb/log-error-repository/log-error-repository'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdaptarer = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const logErrorMongoRepository = new LogErrorMongoRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dbAddAccount = new DbAddAccount(
    bcryptAdaptarer,
    accountMongoRepository
  )

  const signupController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )

  return new LogControllerDecorator(signupController, logErrorMongoRepository)
}
