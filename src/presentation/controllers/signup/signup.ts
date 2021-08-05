import {
  AddAccount,
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  Validation
} from './signup-protocols'
import { MissingParamError, InvalidParamsError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validation: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)

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
      return serverError(error)
    }
  }
}
