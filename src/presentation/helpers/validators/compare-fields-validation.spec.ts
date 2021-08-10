import { InvalidParamsError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')

  return {
    sut
  }
}

describe('Compare field Validation', () => {
  test('should throw a InvalidParamError when the compare is invalid', async () => {
    const { sut } = makeSut()

    expect(
      sut.validate({
        field: '123',
        fieldToCompare: '1234'
      })
    ).toEqual(new InvalidParamsError('fieldToCompare'))
  })

  test('shouldn\'t return anything if the fields are equals', async () => {
    const { sut } = makeSut()

    expect(
      sut.validate({
        field: '123',
        fieldToCompare: '123'
      })
    ).toBeUndefined()
  })
})
