import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const {
      email
    } = httpRequest.body

    if (!email) {
      return new Promise(resolve => resolve(
        badRequest(new MissingParamError('email')))
      )
    }

    return ok({})
  }
}
