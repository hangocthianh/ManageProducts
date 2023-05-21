export interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  price: number;
  category: Category;
}
export interface Category {
  id: string;
  name: string;
}
export interface Owner {
  userId: string;
  userName: string;
}
