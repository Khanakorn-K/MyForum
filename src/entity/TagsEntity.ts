import { TagsResponseResultModel } from "@/modelGlobal/TagsResponseModel";

export class TagsEntity {
  id: string;
  name: string;
  slug: string;

  constructor(tagsResponseModel: TagsResponseResultModel) {
    this.id = tagsResponseModel.id;
    this.name = tagsResponseModel.name;
    this.slug = tagsResponseModel.slug;
  }
}
