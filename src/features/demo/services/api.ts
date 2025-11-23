
import { DemoDataResponseModel } from '../models/DemoDataResponseModel';
import { DemoDataEntity } from '../entity/DemoData';
import { apiClient } from '../../../lib/api-client';
import { ApiResponse } from '../../../types/api';

export const demoService = {
  fetchDataAll: async (): Promise<DemoDataEntity[]> => {
    const response = await apiClient.get<ApiResponse<DemoDataResponseModel[]>>('/demo');
    return response.data.map(item => new DemoDataEntity(item));
  },

  fetchOneById: async (id: string): Promise<DemoDataEntity> => {
    const response = await apiClient.get<ApiResponse<DemoDataResponseModel>>(`/demo/${id}`);
    return new DemoDataEntity(response.data);
  },

  fetchCreate: async (data: DemoDataEntity): Promise<DemoDataEntity> => {
    const response = await apiClient.post<ApiResponse<DemoDataResponseModel>>('/demo', data);
    return new DemoDataEntity(response.data);
  },

  fetchUpdate: async (id: string, data: DemoDataEntity): Promise<DemoDataEntity> => {
    const response = await apiClient.put<ApiResponse<DemoDataResponseModel>>(`/demo/${id}`, data);
    return new DemoDataEntity(response.data);
  },

  detchDelete: (id: string) => {
    return apiClient.delete<ApiResponse<void>>(`/demo/${id}`);
  },
};
