import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  crateFile(file: Express.Multer.File): string {
    try {
      const fileName = `${v4()}.png`;

      const filePath = path.resolve('static', fileName);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      fs.writeFileSync(filePath, file.buffer);

      return fileName;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
