import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

export function CustomFileFieldsInterceptor() {
  return FileFieldsInterceptor(
    [
      { name: 'file', maxCount: 1 },
      { name: 'additionalImages', maxCount: 5 },
      {name: 'fileTraceability', maxCount: 1}
    ],
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    },
  );
}