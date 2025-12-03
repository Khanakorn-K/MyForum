import { CategoriesResponseResultModel } from "@/model/CategoriesResponseModel";

export class CategoriesEntity {
  id: string;
  name: string;
  slug: string;

  constructor(tagsResponseModel: CategoriesResponseResultModel) {
    this.id = tagsResponseModel.id;
    this.name = tagsResponseModel.name;
    this.slug = tagsResponseModel.slug;
  }
}
