export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface UpdateProductDTO {
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
}