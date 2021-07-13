import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('should call Encryptor with correct password', async () => {
    class EncryptorStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encryptorStub = new EncryptorStub()

    const sut = new DbAddAccount(encryptorStub)

    const encryptorSpy = jest.spyOn(encryptorStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)

    expect(encryptorSpy).toHaveBeenCalledWith('valid_password')
  })
})
