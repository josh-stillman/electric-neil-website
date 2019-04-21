// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
// import mailgunTransport from 'nodemailer-mailgun-transport'
const  mailgunTransport = require('nodemailer-mailgun-transport');
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
import { reactGetBaseUrl } from '../utils'
dotenv.config();

export class Mailer {
  transportOptions: any;
  transport: any;
  mailService: any;
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.transportOptions = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY || '',
        domain: process.env.MAILGUN_URL || '',
      },
    };
    this.transport = mailgunTransport(this.transportOptions);
    this.mailService = nodemailer.createTransport(this.transport);
    this.baseUrl = baseUrl || process.env.URL || '';
  }

  async sendSubscribe(email: string, id: string) {
    const message = {
      from: 'neil@electricneil.com',
      to: email,
      subject: 'Welcome to the Electric Neil Revolution🤘🤘🤘',
      text: `Welcome to the ELECTRIC NEIL MAILING LIST EXPERIENCE! Go to ${this.baseUrl}/subscribe/${id} to confirm your subscription and get down with the Neil. 💩Unsubscribe💩: ${this.baseUrl}/unsubscribe/${id}`,
      html: `<p>Welcome to the ELECTRIC NEIL MAILING LIST EXPERIENCE! <a href="${this.baseUrl}/subscribe/${id}">Click here</a> to confirm your subscription and get down with the Neil.</p> <p><a href="${this.baseUrl}/unsubscribe/${id}">💩Unsubscribe💩</a></p>`
    };

    const res = await this.mailService.sendMail(message);
    console.log(res);
    return res;
  }
}
