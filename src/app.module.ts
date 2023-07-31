import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PdfGeneratorModule } from './pdfgenerator/pdfgenerator';

@Module({
  imports: [UsersModule,PdfGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
