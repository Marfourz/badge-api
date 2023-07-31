import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfGeneratorService } from './pdfgenerator.service';

@Controller("pdf")
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Get('/generate-pdf')
  async generatePdf(@Res() res: Response): Promise<void> {
    const buffer = await this.pdfGeneratorService.generatePdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });

    res.send(buffer);
  }
}
