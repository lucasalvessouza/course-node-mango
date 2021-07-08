import { MissingParamError } from '../errors/missing-params-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/https'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/emailValidator'
import { InvalidParamsError } from '../errors/invalid-params-error'
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

    try {
      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

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
