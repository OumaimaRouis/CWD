// auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/mail.interface';
import { MailerService } from './MailerService';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) {}

  async registerUser(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { name, email, password } = createAuthDto;

    const existingUser = await this.authRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.authRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.authRepository.save(newUser);
  }

  async loginUser(loginAuthDto: LoginAuthDto): Promise<string> {
    const { email, password } = loginAuthDto;

    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return 'some_jwt_token';
  }

  private template(html: string, replacements: Record<string, string>) {
    return html.replace(
      /%(\w*)%/g,
      (m, key) => (replacements.hasOwnProperty(key) ? replacements[key] : ''),
    );
  }

  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject } = dto;
    const html = dto.placeholderReplacements ? this.template(dto.html, dto.placeholderReplacements) : dto.html;
    return this.mailerService.sendEmail({ from, recipients, subject, html });
  }

  async sendVerificationEmail(email: string, token: string) {
    const dto: SendEmailDto = {
      recipients: [{ name: email, address: email }],
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking on the following link: <a href="http://example.com/verify?token=${token}">Verify Email</a></p>`,
    };
    await this.sendEmail(dto);
  }


  async sendPasswordResetEmail(email: string, token: string) {
    const dto: SendEmailDto = {
      recipients: [{ name: email, address: email }],
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click on the following link to reset your password: <a href="http://example.com/reset-password?token=${token}">Reset Password</a></p>`,
    };
    await this.sendEmail(dto);
  }

}
