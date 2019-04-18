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

    const mailRes = await this.mailer.sendSubscribe(email, id)

    return [200, id];
  }

  async confirm(id: string) {
    await this.db.connect();

    const [err, data] = await to(this.db.confirmSubscriber(id));

    this.db.disconnect();

    if (err) {
      return [400, 'Email address not found. Please sign up again.'];
    }

    return [200, 'Email Successfully Confirmed. Welcome to the Neil Revolution!'];
  }

  async unsubscribe(id: string) {
    await this.db.connect();

    const [err, data] = await to(this.db.unsubscribe(id));

    this.db.disconnect();

    if (err) {
      return [400, 'Error: Email address not found.'];
    }

    return [200, 'The Neil is sorry to see you go.  Sign up again at electricneil.com whenever you\'re ready to rock again!'];
  }
}
