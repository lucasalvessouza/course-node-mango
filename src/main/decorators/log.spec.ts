import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface StubType {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve({
        body: {},
        statusCode: 200
      }))
    }
  }
  return new ControllerStub()
}

const makeSut = (): StubType => {
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
  }
}

describe('LogController decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        name: 'Lucas Alves',
        email: 'lucas@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return the same result of controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'Lucas Alves',
        email: 'lucas@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      body: {},
      statusCode: 200
    })
  })
})
