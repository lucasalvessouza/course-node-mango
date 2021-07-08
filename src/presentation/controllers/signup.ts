import { MissingParamError, InvalidParamsError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const {
      password,
      passwordConfirmation,
      email
    } = httpRequest.body

    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamsError('passwordConfirmation'))
    }

    try {
      const emailIsValid = this.emailValidator.isValid(email)

      if (!emailIsValid) {
        return badRequest(new InvalidParamsError('email'))
      }

      return {
        body: httpRequest.body,
        statusCode: 200
      }
    } catch (error) {
      return serverError()
    }
  }
}
