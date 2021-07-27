import { InvalidParamsError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const {
      email,
      password
    } = httpRequest.body

    if (!email) {
      return new Promise(resolve => resolve(
        badRequest(new MissingParamError('email')))
      )
    }
    if (!password) {
      return new Promise(resolve => resolve(
        badRequest(new MissingParamError('password')))
      )
    }

    const emailIsValid = this.emailValidator.isValid(email)
    if (!emailIsValid) {
      return new Promise(resolve => resolve(
        badRequest(new InvalidParamsError('email')))
      )
    }

    return ok({})
  }
}
