import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import { PrismaService } from '../prisma.service';
import { UploadService } from '../upload/upload.service';
import { createSlug } from '../utils';

const prismaService = new PrismaService();
const uploadService = new UploadService(prismaService);

export async function saveImage(imageUrl, customDate?: Date) {
  const url = encodeURI(imageUrl);
  return await axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then(async (result) => {
      const buffer = Buffer.from(result.data, 'binary');

      return await uploadService.upload(
        {
          mimetype: result.headers['content-type'],
          buffer,
          originalname: createSlug(imageUrl, undefined, false),
        },
        customDate,
      );
    })
    .catch((err) => {
      console.error(`Err on url: ${url}, with code: ${err.code}`);
      return null;
    });
}
