import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('Required field Validation', () => {
  test('should throw a MissingParamError if a required field not is provided', async () => {
    const sut = makeSut()

    expect(
      sut.validate({
        anotherField: '123'
      })
    ).toEqual(new MissingParamError('field'))
  })

  test('shouldn\'t return anything if the required field is provided', async () => {
    const sut = makeSut()

    expect(
      sut.validate({
        field: 'any_email@gmail.com'
      })
    ).toBeUndefined()
  })
})
