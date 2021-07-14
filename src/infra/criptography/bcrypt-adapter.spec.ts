import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('should calls bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should returns a hash on sucess', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })
})
