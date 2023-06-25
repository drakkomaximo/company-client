import { Product, ProductApiResponse, ProductType, ROUTES } from "../utils";
import axiosIntance from "./axios";

export const getProductsRequest = async ({ companyId }: { companyId: string }) => {
  try {
    const resp = await axiosIntance.get<ProductApiResponse[]>(`${ROUTES.PRODUCTS}/${companyId}`);
    if (resp.status === 200) {
      return resp.data;
    }
  } catch (error) {
    return [];
  }
};

export const getProductByIdRequest = async ({ id }: { id: string }) => {
  try {
    const resp = await axiosIntance.get<ProductApiResponse>(
      `${ROUTES.PRODUCT}/${id}`
    );
    if (resp.status === 200) {
      return resp.data;
    }
  } catch (error) {
    return null;
  }
};

export const createProductRequest = async ({
  companyId,
  product,
}: {
  companyId: string;
  product: Product;
}) => {
  const newProduct: Product = {
    ...product,
    companyId,
  };
  const form = new FormData()

  for(const key in newProduct){
    form.append(key, newProduct[key])
  }

  return await axiosIntance.post(ROUTES.PRODUCT, form, {
    headers:{
      "Content-type": "multipart/form-data"
    }
  });
};

export const updateProductRequest = async ({ product }: { product: Product }) =>
  axiosIntance.put(`${ROUTES.PRODUCT}/${product.id}`, product);

export const deleteProductRequest = async ({ id }: { id: string }) =>
  axiosIntance.delete(`${ROUTES.PRODUCT}/${id}`);
