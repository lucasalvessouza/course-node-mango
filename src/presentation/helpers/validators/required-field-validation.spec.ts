import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required field Validation', () => {
  test('should throw a MissingParamError if a required field not is provided', async () => {
    const sut = new RequiredFieldValidation('email')

    expect(
      sut.validate({
        password: '123'
      })
    ).toEqual(new MissingParamError('email'))
  })

  test('shouldn\'t return anything if the required field is provided', async () => {
    const sut = new RequiredFieldValidation('email')

    expect(
      sut.validate({
        email: 'any_email@gmail.com'
      })
    ).toBeUndefined()
  })
})
