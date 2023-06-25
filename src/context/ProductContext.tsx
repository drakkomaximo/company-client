import { createContext, useState } from "react";
import { ContextProduct, Product } from "../utils";
import { createProductRequest, deleteProductRequest, getProductByIdRequest, getProductsRequest, updateProductRequest } from "../api/product";

export const ProductContext = createContext({} as ContextProduct);

export const ProductProvider = ({ children }: { children: JSX.Element }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errors] = useState<string[]>([]);

  const getProducts = async ({companyId}:{companyId: string}) => {
    try {
      const res = await getProductsRequest({companyId});
      if (res && res.length > 0) {
        const formatedCompanies: Product[] = res.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          image: product.image,
          companyId: product.companyId,
        }));
        setProducts(formatedCompanies);
      }else{
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  };

  const getProductById = async ({ id }: { id: string }) => {
    try {
      const res = await getProductByIdRequest({ id });
      if (res) {
        const formatedCompany: Product = {
          id: res._id,
          name: res.name,
          price: res.price,
          quantity: res.quantity,
          description: res.description,
          image: res.image,
          companyId: res.companyId,
        };
        return formatedCompany;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createProduct = async ({ companyId, product }: { companyId: string, product: Product }) => {
    try {
      await createProductRequest({ companyId, product });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async ({ id }: { id: string }) => {
    try {
      const res = await deleteProductRequest({ id });
      if (res.status === 204) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async ({ product }: { product: Product }) => {
    try {
      await updateProductRequest({ product });
    } catch (error) {
      console.log(error);
    }
  };

  const clearProducts = () =>{
    setProducts([])
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        errors,
        clearProducts,
        createProduct,
        getProducts,
        getProductById,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
