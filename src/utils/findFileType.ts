const imageTypes = [
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

const browserTypes = ['js', 'html', 'css'];

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

export function findFileType(mimeType: string) {
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
