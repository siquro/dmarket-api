// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

const sgMail = require('@sendgrid/mail');

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailVerifyLink(email, token: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({
      to: email,
      from: process.env.DEV_EMAIL_FROM,
      subject: 'Verify your email',
      html: `<strong> <a href="${encodeURI(
        process.env.VERIFY_EMAIL_LINK + token,
      )}">Account verification link</strong>`,
    });
  }

  async sendResetEmailVerificationLink(email, token) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({
      to: email,
      from: process.env.DEV_EMAIL_FROM,
      subject: 'Reset you email',
      html: `<strong> <a href="${encodeURI(
        process.env.RESET_EMAIL_LINK + encodeURIComponent(token),
      )}">Account verification link</strong>`,
    });
  }
}
