import { Database } from './Database';
import { to } from '../utils';
import { Mailer } from './Mailer';

export default class Subscription {
  db: Database;

  mailer: Mailer;

  constructor({ context }: { context?: string }) {
    this.db = new Database({ context });
    this.mailer = new Mailer();
  }

  async add(email: string) {
    await this.db.connect();

    const [err, data] = await to(this.db.addSubscriber(email));

    if (err) {
      return [
        400,
        'That email address is already subscribed. Please try a new address',
      ];
    }

    const id = data.insertedId.toHexString();

    await this.mailer.sendSubscribe(email, id);

    return [200, id];
  }

  async confirm(id: string) {
    await this.db.connect();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [err, data] = await to(this.db.confirmSubscriber(id));

    this.db.disconnect();

    if (err) {
      return [
        400,
        'Email address not found. Please sign up with your email in the form below.',
      ];
    }

    return [
      200,
      'Email Successfully Confirmed. Welcome to the Electric Neil Revolution!  Stay tuned for up-to-the-minute Neil News.',
    ];
  }

  async unsubscribe(id: string) {
    await this.db.connect();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [err, data] = await to(this.db.unsubscribe(id));

    this.db.disconnect();

    if (err) {
      return [400, 'Error: Email address not found.'];
    }

    return [
      200,
      "The Neil is sorry to see you go.  Sign up again here whenever you're ready to rock and roll again!",
    ];
  }
}
