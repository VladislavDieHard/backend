export const imageTypes = [
  'apng',
  'bmp',
  'gif',
  'ico',
  'cur',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'tif',
  'tiff',
  'webp',
];

const docTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'rtf'];
const archiveTypes = ['rar', 'zip', '7z'];


enum FileTypesType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  ARCHIVE = 'ARCHIVE',
}

export enum FileTypes {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  ARCHIVE = 'ARCHIVE',
  UNSUPPORTED = 'Unknown file type',
}

type ObjectTypesType = {
  [key in FileTypesType]: string[];
};

const objectTypes: ObjectTypesType = {
  [FileTypes.IMAGE]: imageTypes,
  [FileTypes.DOCUMENT]: docTypes,
  [FileTypes.ARCHIVE]: archiveTypes,
};

export const officeType: { [key: string]: string } = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'application/docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'application/xlsx',
  'application/msword': 'application/doc',
};

export function findFileType(mimeType: string) {
  if (mimeType === 'application/octet-stream') return 'exclude';
  const mime: string = mimeType.split('/').pop();
  let type: FileTypesType;

  Object.keys(objectTypes).forEach((typeKey: FileTypesType) => {
    if (objectTypes[typeKey].includes(mime)) {
      type = typeKey;
    }
  });

  if (type) {
    return type;
  } else {
    return FileTypes.UNSUPPORTED;
  }
}
