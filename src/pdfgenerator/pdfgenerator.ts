import {Module, NestModule, RequestMethod } from '@nestjs/common';

import { PdfGeneratorController } from './pdfgenerator.controller';
import { PdfGeneratorService } from './pdfgenerator.service';
import { PrismaService } from '../prisma.service';


@Module({
 
  controllers: [PdfGeneratorController],
  providers: [PdfGeneratorService]
})
export class PdfGeneratorModule {
 
}
