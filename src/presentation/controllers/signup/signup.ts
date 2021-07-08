import {
  AddAccount,
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator
} from './signup-protocols'
import { MissingParamError, InvalidParamsError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (
    emailValidator: EmailValidator,
    addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const {
      name,
      email,
      password,
      passwordConfirmation
    } = httpRequest.body

    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamsError('passwordConfirmation'))
    }

    try {
      const emailIsValid = this.emailValidator.isValid(email)

      if (!emailIsValid) {
        return badRequest(new InvalidParamsError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
