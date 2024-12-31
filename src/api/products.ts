import api from './axios';
import { Product, CreateProductDTO, UpdateProductDTO } from '@/types/product';

export const productApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: CreateProductDTO) => api.post<Product>('/products', data),
  update: (id: string, data: UpdateProductDTO) => api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};