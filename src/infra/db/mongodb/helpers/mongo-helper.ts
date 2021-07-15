import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,

  async connect (uri: string) {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect () {
    this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const {
      _id,
      ...collectionWithoutId
    } = collection

    return {
      id: _id,
      ...collectionWithoutId
    }
  }
}
