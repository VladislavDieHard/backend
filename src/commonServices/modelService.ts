import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ModelFieldsDto } from '../common.dto';
import { parseModelName } from '../utils';

export class ModelService {
  readonly prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  getModels() {
    const dataModel = (this.prismaService as any)._dmmf.datamodel;
    return dataModel.models.map((model) => model.name);
  }

  getModelMeta(model: string) {
    const dataModel = (this.prismaService as any)._dmmf.datamodel;
    let findedModel;
    dataModel.models.forEach((modelData) => {
      if (model === modelData.name.toLowerCase()) {
        findedModel = modelData;
      }
    });

    if (!findedModel) {
      throw new HttpException(
        `Haven\`t model with name: ${model}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const resultModel = {
      name: findedModel.name,
      fields: [],
    };

    findedModel.fields.forEach((field) => {
      const fieldDefine = this.defineFieldType(field);
      if (fieldDefine) {
        resultModel.fields.push(fieldDefine);
      }
    });

    return resultModel;
  }

  defineFieldType(field: ModelFieldsDto) {
    if (field.name === 'id' && field.isId) return undefined;
    if (field.name.match(/Id/gm)) return undefined;

    if (
      field.type === 'String' &&
      field.kind === 'scalar' &&
      !field.documentation &&
      !field.isReadOnly
    ) {
      return {
        type: 'String',
        name: field.name,
        fieldName: field.name,
        isRequired:
          field.name === 'slug' ? !field.isRequired : field.isRequired,
        hasDefaultValue: field.hasDefaultValue,
      };
    }

    if(field.kind === "enum" && field.type === "MenuItemType") {
      return {
        type:"String",
        name: field.name,
        fieldName: field.name,
        isRequired: field.isRequired,
        hasDefaultValue: field.hasDefaultValue,
      }
    }

    if (field.type === 'DateTime' && field.kind === 'scalar') {
      return {
        type: 'DateTime',
        name: field.name,
        fieldName: field.name,
        isRequired: field.isRequired,
        hasDefaultValue: field.hasDefaultValue,
      };
    }

    if (
      field.type === 'String' &&
      field.kind === 'scalar' &&
      field.documentation &&
      !field.isReadOnly
    ) {
      return {
        type: field.documentation,
        name: field.name,
        fieldName: field.name,
        isRequired: field.name,
        hasDefaultValue: field.hasDefaultValue,
      };
    }

    if (field.kind === 'object' && !field.isReadOnly && !field.isList) {
      return {
        type: 'Relation',
        name: field.name,
        fieldName: field.relationFromFields[0],
        dataUrl: `/${parseModelName(field.type)}`,
        relation: 'ManyToOne',
        isRequired: field.isRequired,
        hasDefaultValue: field.hasDefaultValue,
      };
    }

    if (field.kind === 'object' && !field.isReadOnly && field.isList) {
      return {
        type: 'Relation',
        name: field.name,
        fieldName: field.name,
        dataUrl: `/${parseModelName(field.name)}`,
        relation: 'OneToMany',
        isRequired: field.isRequired,
        hasDefaultValue: field.hasDefaultValue,
      };
    }
  }
}
