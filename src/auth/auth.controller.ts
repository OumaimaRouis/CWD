// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SendEmailDto } from './dto/mail.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.registerUser(createAuthDto);
  }

  @Post('login')
  async loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginUser(loginAuthDto);
  }

  @Post('send-email')
  async sendMail(@Body() body: Record<string, string>) {
    const dto: SendEmailDto = {
      recipients: [{ name: 'John Doe', address: 'john@example.com' }],
      subject: 'lucky',
      html: '<p><strong>Hi! %name% </strong> </p>',
    };
    return await this.authService.sendEmail(dto);
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body('email') email: string) {
    const verificationToken = 'some_verification_token'; // Generate a real token here
    return this.authService.sendVerificationEmail(email, verificationToken);
  }

  @Post('send-password-reset-email')
  async sendPasswordResetEmail(@Body('email') email: string) {
    const resetToken = 'some_reset_token'; // Generate a real token here
    return this.authService.sendPasswordResetEmail(email, resetToken);
  }
}
