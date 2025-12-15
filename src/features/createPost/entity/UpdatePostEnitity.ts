import { UpdatePostResponseModel } from "../models/UpdatePostResponseModel";

export class UpdatePostEntity {
  message: string;
  id: string;
  success: boolean;

  constructor(entity: UpdatePostResponseModel) {
    this.success = entity.success ?? false;
    this.message = entity.message ?? "";
    this.id = entity.id ?? "";
  }
}
