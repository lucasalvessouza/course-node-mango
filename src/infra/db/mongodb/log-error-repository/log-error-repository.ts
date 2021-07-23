import { LogErrorRepository } from '../../../../data/protocols/log-error.repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogErrorMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const collection = await MongoHelper.getCollection('errors')

    await collection.insertOne({
      error: stack
    })
  }
}
