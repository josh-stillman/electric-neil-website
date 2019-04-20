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
      subject: 'Join the Electric Neil Revolution✔',
      text: `hello ${email}, go to ${this.baseUrl}/subscribe/${id} to confirm your subscription. Your mongo id is ${id}`,
      html: `<p>hello ${email}, <a href="${this.baseUrl}/subscribe/${id}">click here</a> to confirm your subscription. Your mongo id is ${id}</p>`
    };

    const res = await this.mailService.sendMail(message);
    console.log(res);
    return res;
  }
}
