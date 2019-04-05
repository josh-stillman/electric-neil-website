import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport'
import dotenv from 'dotenv';
import { getBaseUrl } from '../utils'
dotenv.config();

export class Mailer {
  transportOptions: any;
  transport: any;
  mailService: any;

  constructor() {
    this.transportOptions = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY || '',
        domain: process.env.MAILGUN_URL || '',
      },
    };
    this.transport = mailgunTransport(this.transportOptions);
    this.mailService = nodemailer.createTransport(this.transport);
  }

  async sendSubscribe(email: string, id: string) {
    const message = {
      from: 'neil@electricneil.com',
      to: email,
      subject: 'Join the Electric Neil Revolution✔',
      text: 'NEIL!',
      html: `<p>hello ${email}, <a href="${getBaseUrl ()}/subscribe/${id}">click here</a> to confirm your subscription. your mongo id is ${id}</p>`
    };

    const res = await this.mailService.sendMail(message);
    console.log(res);
    return res;
  }
}
