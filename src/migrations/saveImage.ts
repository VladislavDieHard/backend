import axios from 'axios';
import { PrismaService } from '../prisma.service';
import { UploadService } from '../upload/upload.service';
import { createSlug } from '../utils';

const prismaService = new PrismaService();
const uploadService = new UploadService(prismaService);

const base64MimeRegExp = new RegExp(
  /image\/(gif|jpg|jpeg|png|webp|svg|ico+)/gm,
);

export async function saveImage(
  imageUrl,
  customDate?: Date,
  isBase64?: boolean,
) {
  if (isBase64) {
    const base64Mime = imageUrl.match(base64MimeRegExp)[0];
    const buffer = Buffer.from(imageUrl, 'base64');

    return await uploadService.upload(
      {
        mimetype: base64Mime,
        buffer,
        originalname: 'noname',
      },
      customDate,
    );
  } else {
    const url = encodeURI(imageUrl);

    return await axios
      .get(url, { responseType: 'arraybuffer' })
      .then(async (response) => {
        const buffer = Buffer.from(response.data, 'binary');
        const mime =
          response.headers['content-type'].match(base64MimeRegExp)[0];

        return await uploadService.upload(
          {
            mimetype: mime,
            buffer,
            originalname: createSlug(imageUrl, undefined, false),
          },
          customDate,
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
