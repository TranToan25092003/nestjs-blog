import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],

      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('appConfig.mailHost'),
          secure: false,
          port: 2525,
          auth: {
            user: config.get('appConfig.smptUsername'),
            pass: config.get('appConfig.smptPassword'),
          },
        },
        defaults: {
          from: `"My Blog" <no-repy@nestjs-blog.com>`,
        },
        template: {
          dir: join(__dirname, 'template'),
          adapter: new EjsAdapter({
            inlineCssEnabled: true,
          }),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

/**
 * create mail module
 *
 * install dependency npm i @nestjs-modules/mailer
 *
 * npm i nodemailer
 *
 *  npm i ejs
 *
 * cofig file and add validation
 *
 * import mailermodule and config it
 */
