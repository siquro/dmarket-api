// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://apikey: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@smtp.sendgrid.net',
      defaults: {
        from: '"Antons" <test@testingevery.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
