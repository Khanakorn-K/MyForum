export interface TagsResponseModel {
  success: boolean;
  data: TagsResponseResultModel[];
}

export interface TagsResponseResultModel {
  id: string;
  name: string;
  slug: string;
}
