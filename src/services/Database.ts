import { MongoClient, MongoClientOptions,  Db, ObjectId } from 'mongodb';

import dotenv from 'dotenv';
dotenv.config();

export const getDb = async () => {
  const db = new Database();
  await db.connect();
  return db;
}

export class Database {
  url: string;
  mongoClient?: MongoClient;
  db?: Db;

  constructor(url?: string) {
    this.url = url || process.env.MONGO_URL || '';
  }

  async connect() {
      const options: MongoClientOptions = {
          ssl: true,
          socketTimeoutMS: 1000,
          useNewUrlParser: true,
      };

      const client = await MongoClient.connect(this.url, options);
      this.db = client.db(this.getDbName());
      return this.db;
  }

  getDbName() {
    return process.env.ENV === 'dev' ? 'DEV' : 'services';
  }

  async getCollection(collectionName: string) {
    return this.db!.collection(collectionName);
  }

  async addSubscriber(email: string) {
    const subs = await this.getCollection('subscribers');
    return await subs.insertOne({
        email,
        createdAt: new Date().toISOString(),
        confirmed: false,
    });
  }

  async confirmSubscriber(id: string) {
    const subs = await this.getCollection('subscribers');
    return await subs.updateOne(
      { _id : new ObjectId(id) },
      { $set: { 'confirmed' : true } });
    }

  async unsubscribe(id: string) {
    const subs = await this.getCollection('subscribers');
    const email = await subs.findOne({_id: new ObjectId(id)});
    const unsubs = await this.getCollection('unsubscribes');
    await unsubs.insertOne(email);
    return await subs.deleteOne(email);
  }

  async disconnect() {
      this.mongoClient!.close();
  }
}
