import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Auth.module';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [AuthModule],
})
export class AppModule {}