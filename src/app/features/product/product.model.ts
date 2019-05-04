/**
 * Product model
 */
export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  supplierId: number;
  imageUrl: string;
  packageDimensions: string;
  packageWeight: number;
  rating: number;
  category: string;
  active: boolean;
}
