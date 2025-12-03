export interface CategoriesResponseModel {
  success: boolean;
  data: CategoriesResponseResultModel[];
}

export interface CategoriesResponseResultModel {
  id: string;
  name: string;
  slug: string;
}
