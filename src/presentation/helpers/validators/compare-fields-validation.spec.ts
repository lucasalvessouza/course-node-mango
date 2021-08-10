import { InvalidParamsError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('password', 'passwordConfirmation')

  return {
    sut
  }
}

describe('Compare field Validation', () => {
  test('should throw a InvalidParamError when the compare is invalid', async () => {
    const { sut } = makeSut()

    expect(
      sut.validate({
        password: '123',
        passwordConfirmation: '1234'
      })
    ).toEqual(new InvalidParamsError('passwordConfirmation'))
  })

  test('shouldn\'t return anything if the fields are equals', async () => {
    const { sut } = makeSut()

    expect(
      sut.validate({
        password: '123',
        passwordConfirmation: '123'
      })
    ).toBeUndefined()
  })
})
