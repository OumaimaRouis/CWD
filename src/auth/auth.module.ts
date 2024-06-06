// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './MailerModule';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), ConfigModule, MailerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
