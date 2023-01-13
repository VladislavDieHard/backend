import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EntryGetService } from '../entry/services/entry.get';
import { Entry } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly entryGetService: EntryGetService,
  ) {}

  // async onModuleInit() {
  //   const isEntryIndexExists = await this.elasticsearchService.indices.exists({
  //     index: 'entries',
  //   });
  //
  //   const isDocumentIndexExists =
  //     await this.elasticsearchService.indices.exists({
  //       index: 'documents',
  //     });
  //
  //   if (isEntryIndexExists) {
  //     await this.elasticsearchService.indices.putMapping({
  //       index: 'entries',
  //     });
  //   }
  // }

  async indexEntries(): Promise<string | Error> {
    try {
      const prismaService = this.entryGetService.prismaService;
      const elasticClient = this.elasticsearchService;
      const limit = 50;
      const entriesCount =
        await this.entryGetService.prismaService.entry.count();

      for (let i = 0; i <= entriesCount; ) {
        const entries = await prismaService.entry.findMany({
          take: limit,
          skip: i,
        });

        for (const entry of entries) {
          const isEntryIndexed = await elasticClient.exists({
            index: 'entries',
            id: entry.id,
          });

          if (!isEntryIndexed) {
            await elasticClient.index({
              index: 'entries',
              id: entry.id,
              document: {
                id: entry.id,
                title: entry.title,
                desc: entry.desc,
                slug: entry.slug,
                isDeleted: entry.isDeleted,
                type: 'entry',
              },
            });
          }
        }

        if (i === entriesCount) break;
        if (i + limit > entriesCount) {
          i = i + (entriesCount - i);
        } else {
          i += limit;
        }
      }

      return 'All entries were indexed';
    } catch (e) {
      return new Error(e.message);
    }
  }

  async indexDocuments(): Promise<string | Error> {
    try {
      const prismaService = this.entryGetService.prismaService;
      const elasticClient = this.elasticsearchService;
      const limit = 50;
      const documentsCount =
        await this.entryGetService.prismaService.document.count();

      for (let i = 0; i <= documentsCount; ) {
        const documents = await prismaService.document.findMany({
          take: limit,
          skip: i,
        });

        for (const document of documents) {
          const isEntryIndexed = await elasticClient.exists({
            index: 'documents',
            id: document.id,
          });

          if (!isEntryIndexed) {
            await elasticClient.index({
              index: 'documents',
              id: document.id,
              document: {
                id: document.id,
                title: document.title,
                isDeleted: document.isDeleted,
                type: 'document',
              },
            });
          }
        }

        if (i === documentsCount) break;
        if (i + limit > documentsCount) {
          i = i + (documentsCount - i);
        } else {
          i += limit;
        }
      }

      return 'All documents were indexed';
    } catch (e) {
      return new Error(e.message);
    }
  }

  async update(index: string, id: string, updatedEntry: Entry) {
    return await this.elasticsearchService.update({
      id,
      index,
      doc: {
        id: updatedEntry.id,
        title: updatedEntry.title,
        desc: updatedEntry.desc,
        slug: updatedEntry.slug,
      },
    });
  }

  async search(query: string) {
    const result = await this.elasticsearchService.search({
      query: {
        multi_match: {
          query: query,
          fields: ['title', 'desc'],
        },
      },
      size: 5,
    });

    console.log(result);

    const hits = result.hits.hits;

    return hits.map((match) => match._source);
  }
}
