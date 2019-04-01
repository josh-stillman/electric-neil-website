import { Database} from './Database';
import { to } from '../utils';
import { Mailer } from './Mailer';

export default class Subscription {
  db: Database;
  mailer: Mailer;
  constructor() {
    this.db = new Database();
    this.mailer = new Mailer();
  }

  async add(email: string) {
    await this.db.connect();

    const [err, data] = await to(this.db.addSubscriber(email));

    if (err) {
      return [400, 'That email address is already subscribed. Please try a new address'];
    }

    const id = data.insertedId.toHexString();

    const mailRes = this.mailer.sendSubscribe(email, id)

    return [200, id];
  }
}
