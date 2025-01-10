export interface Dimensions {
  width: number;
  length: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  manufacturing: string;
  origin: string;
  material: string;
  colors: string[];
  dimensions: Dimensions;
  ageInYears: number;
  price: number;
  quantity: number;
  details: string;
  images?: string[];
}

export interface CreateProductDTO {
  name: string;
  manufacturing: string;
  origin: string;
  material: string;
  colors: string[];
  dimensions: Dimensions;
  ageInYears: number;
  price: number;
  quantity: number;
  details: string;
  images?: string[];
}

export interface UpdateProductDTO {
  name?: string;
  manufacturing?: string;
  origin?: string;
  material?: string;
  colors?: string[];
  dimensions?: Dimensions;
  ageInYears?: number;
  price?: number;
  quantity?: number;
  details?: string;
  images?: string[];
}