import { Injectable } from "@nestjs/common";
import { GetService } from "../../commonServices/getService";

@Injectable()
export class ExhibitionGetService extends GetService {
  async getExhibition(
    { search, isDeleted, pageSize, page, orderBy, searchByField }
  ) {
    return this.addSearch(["title"], search)
      .addIsDeleted(isDeleted)
      .addPagination(pageSize, page)
      .addOrderBy(orderBy)
      .addSearchByFieldValue(searchByField)
      .executeFindMany("Exhibition");
  }

  async
}
