// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

const sgMail = require('@sendgrid/mail');

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const uri = encodeURI(process.env.VERIFY_EMAIL_LINK + token);

    await sgMail.send({
      to: user.email,
      from: 'anton.sharigin@icloud.com',
      subject: 'Verify your email',
      text: '',
      html: `<strong> <a href="${uri}">Account verification link</strong>`,
    });
  }
}
