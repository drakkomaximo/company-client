export interface OptionBoxProps {
  label: string;
}

export interface CompanyCardProps {
  company: Company;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductModalProps {
  product: Product;
}

export interface DocuPdfProps {
  product: Product;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserApiResponse {
  username?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  _id: string;
}

export interface Company {
  userId: string;
  name: string;
  address: string;
  nit: string;
  phone: string;
  id: string;
}

export interface CompanyApiResponse {
  address: string;
  createdAt: string;
  name: string;
  nit: string;
  phone: string;
  updatedAt: string;
  _id: string;
  user: UserApiResponse;
}

export interface Product {
  companyId: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: any | Image;
  id: string;
}

export type ProductType =
  | "companyId"
  | "name"
  | "quantity"
  | "price"
  | "description"
  | "image"
  | "id";

export interface ProductApiResponse {
  address: string;
  createdAt: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: Image;
  updatedAt: string;
  _id: string;
  companyId: string;
}

export interface Image {
  public_id: string;
  secure_url: string;
}

export interface ContextAuth {
  user: null | User;
  errors: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: ({ user }: { user: User }) => Promise<boolean>;
  signin: ({ user }: { user: Omit<User, "username"> }) => void;
  logOut: () => void;
}

export interface ContextCompany {
  companies: Company[];
  companyId: string | null;
  errors: string[];
  getCompanies: () => void;
  updateCompanyId: ({ id }: { id: string | null }) => void;
  getCompanyById: ({ id }: { id: string }) => Promise<Company | null>;
  createCompany: ({ company }: { company: Company }) => void;
  deleteCompany: ({ id }: { id: string }) => void;
  updateCompany: ({ company }: { company: Company }) => void;
}

export interface ContextProduct {
  products: Product[];
  errors: string[];
  clearProducts: () => void;
  getProducts: ({ companyId }: { companyId: string }) => void;
  getProductById: ({ id }: { id: string }) => Promise<Product | null>;
  createProduct: ({
    companyId,
    product,
  }: {
    companyId: string;
    product: Product;
  }) => void;
  deleteProduct: ({ id }: { id: string }) => void;
  updateProduct: ({ product }: { product: Product }) => void;
}
