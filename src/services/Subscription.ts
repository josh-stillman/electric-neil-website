import {getDb, Database} from './Database';
import { to } from '../utils';

export default class Subscription {
  db: Database;
  constructor() {
    this.db = new Database();
  }

  async add(email: string) {
    await this.db.connect();

    const [err, data] = await to(this.db.addSubscriber(email));

    if (err) {
      return [400, 'That email is already subscribed. Please try a new address'];
    }

    const id = data.insertedId.toHexString();

    return [200, id];

    // send the email.
  }

  // [err, user] = await to(UserModel.findById(1));

  // async remove(email: string) {

  // }
}
