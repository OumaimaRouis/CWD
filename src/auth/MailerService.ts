// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/mail.interface';
import { MailOptions } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  private mailTransport() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject, html } = dto;
    const transport = this.mailTransport();
    const options: MailOptions = {
      from: from ?? { address: this.configService.get<string>('DEFAULT_MAIL_FROM') },
      to: recipients,
      subject,
      html,
    };

    try {
      return await transport.sendMail(options);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }
}
