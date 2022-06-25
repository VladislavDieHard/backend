import { PrismaService } from '../../prisma.service';
import { v4 } from 'uuid';
import { select } from '../select';
import { saveImage } from '../saveImage';
import { parseHtml } from '../parseHtml';
import { getConfig } from '../../utils/getConfig';

const prismaService = new PrismaService();
const config = getConfig();

export async function document() {
  const documents = await select(
    `SELECT * FROM menuitem_documents WHERE e_is_deleted != 1 AND mi_is_deleted != 1`,
  );
  const existDocuments = await prismaService.document.findMany({});
  const documentOldIds = existDocuments.map((document) => document.oldId);

  for (const document of documents) {
    const oldId = document['e_id'];
    if (!documentOldIds.includes(oldId)) {
      const newId = v4();
      const menuItem = await prismaService.menuItem.findFirst({
        where: {
          oldId: document['mi_id'],
        },
      });
      let preview;

      if (document.image) {
        preview = await saveImage(
          `${config['OLD_URL_MEDIA']}${document.image}`,
        );
      }

      if (menuItem) {
        // const content = await parseHtml(document['e_text']);

        const documentToSave = {
          id: newId,
          oldId,
          title: document['e_title'],
          content: document['e_text'],
          menuItemId: menuItem.id,
          fileId: preview?.id,
        };

        await prismaService.document.create({
          data: documentToSave,
        });
      }
    }
  }
}
