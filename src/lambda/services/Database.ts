import { MongoClient, MongoClientOptions, Db, ObjectId } from 'mongodb';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

// export const getDb = async () => {
//   const db = new Database();
//   await db.connect();
//   return db;
// }

export class Database {
  url: string;

  mongoClient?: MongoClient;

  // eslint-disable-next-line react/static-property-placement
  context?: string;

  db?: Db;

  constructor({ url, context }: { url?: string; context?: string }) {
    this.url = url || process.env.MONGO_URL || '';
    this.context = context || process.env.ENV || '';
  }

  async connect() {
    const options: MongoClientOptions = {
      ssl: true,
      socketTimeoutMS: 1000,
      useNewUrlParser: true,
    };

    const client = await MongoClient.connect(this.url, options);
    this.mongoClient = client;
    this.db = client.db(this.getDbName());
    return this.db;
  }

  getDbName() {
    // TODO: use env var when netlify exposes it to functions
    return this.context === 'production' ? 'services' : 'DEV';
  }

  async getCollection(collectionName: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.db!.collection(collectionName);
  }

  async addSubscriber(email: string) {
    const subs = await this.getCollection('subscribers');
    return subs.insertOne({
      email,
      createdAt: new Date().toISOString(),
      confirmed: false,
    });
  }

  async confirmSubscriber(id: string) {
    const subs = await this.getCollection('subscribers');
    return subs.updateOne(
      { _id: new ObjectId(id) },
      { $set: { confirmed: true } }
    );
  }

  async unsubscribe(id: string) {
    const subs = await this.getCollection('subscribers');
    const email = await subs.findOne({ _id: new ObjectId(id) });
    const unsubs = await this.getCollection('unsubscribes');
    await unsubs.insertOne(email);
    return subs.deleteOne(email);
  }

  async disconnect() {
    if (this.mongoClient) {
      this.mongoClient.close();
    }
  }
}
