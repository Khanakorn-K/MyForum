import { DemoDataResponseModel } from "../models/DemoDataResponseModel";

export class DemoDataEntity {
  id: string;
  message: string;
  timestamp: number;

  constructor(demoDataResponseModel: DemoDataResponseModel) {
    this.id = demoDataResponseModel.id;
    this.message = demoDataResponseModel.message;
    this.timestamp = demoDataResponseModel.timestamp;
  }
}