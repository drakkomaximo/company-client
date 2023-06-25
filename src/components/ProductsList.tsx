import { useEffect } from "react";
import { ProductCard } from "../components";
import { useProduct } from "../hooks/useProduct";
import { useCompany } from "../hooks/useCompany";

export const ProductsList = () => {
  const { getProducts, products } = useProduct();
  const { companyId } = useCompany();

  useEffect(() => {
    companyId && getProducts({companyId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  if (products.length === 0) return <h1>No products created</h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};