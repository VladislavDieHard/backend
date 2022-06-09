import { workerData, parentPort } from 'worker_threads';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import * as extract from 'extract-zip';
import { v4 } from 'uuid';
import { readDirRecursive } from '../utils';
import { Client } from 'minio';
import { getConfig } from '../utils/getConfig';

const config = getConfig();

const minioClient = new Client({
  endPoint: config['MINIO_ENDPOINT'],
  port: config['MINIO_PORT'],
  useSSL: false,
  accessKey: config['MINIO_USER'],
  secretKey: config['MINIO_PASS'],
});

async function uploadToMinio() {
  let time = performance.now();
  const id = v4();
  const tempPath = join(__dirname, '/../upload/temp');
  const zipPath = join(tempPath, `${id}.zip`);

  if (!existsSync(tempPath)) {
    mkdirSync(tempPath, 0o744);
  }

  const fileName = workerData.file.originalname.split('.').shift();

  writeFileSync(zipPath, workerData.file.buffer);
  await extract(zipPath, {
    dir: tempPath,
  });
  await rm(zipPath);

  const entries = await readDirRecursive(join(tempPath, fileName));

  for (const entry of entries) {
    const entryName = `exhibition/${id}${entry
      .substring(entry.indexOf('temp') + 4, entry.length)
      .replaceAll('\\', '/')}`;

    await minioClient.fPutObject(workerData.bucketName, entryName, entry);
  }

  // TODO В будущем убрать измерение времени
  time = performance.now() - time;
  console.log('Время выполнения = ', time);

  return {
    id,
    fileName,
  };
}

uploadToMinio().then((data) => {
  parentPort.postMessage(data);
});
