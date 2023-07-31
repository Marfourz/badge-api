import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable()
export class PdfGeneratorService {

  async generatePdf(): Promise<Buffer> {
    // Load the HTML template from a file
    const htmlTemplate = fs.readFileSync('templates/carteProfessionnelle.html', 'utf8');

    // Convert the HTML template to a PDF using pdfmake
    const fonts = {
      Roboto: {
        normal: 'path/to/Roboto-Regular.ttf',
        bold: 'path/to/Roboto-Bold.ttf',
        italics: 'path/to/Roboto-Italic.ttf',
        bolditalics: 'path/to/Roboto-BoldItalic.ttf',
      },
    };
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    pdfmake.fonts = fonts;

    const docDefinition = {
      content: [
        {
          html: htmlTemplate,
        },
      ],
    };

    const pdfDoc = pdfmake.createPdf(docDefinition);
    try{
        const buffer = await new Promise<Buffer>((resolve, reject) => {
            pdfDoc.getBuffer((buffer) => {
              if (!buffer) {
                reject(new Error('Failed to generate PDF buffer'));
              } else {
                resolve(buffer);
              }
            });
          });
          return buffer;
    }
    catch(error){
        throw error
    }


   
  }
}
