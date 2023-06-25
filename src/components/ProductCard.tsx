import { FC } from "react";
import { ProductCardProps, ROUTES } from "../utils";
import { Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { ProductModal } from ".";

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { deleteProduct } = useProduct();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-4 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <header className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-white capitalize">
            {product.name}
          </h1>

          <img
            className="h-28 w-28 max-w-full object-cover"
            src={product.image.secure_url}
            alt="image description"
          />
        </header>
      </div>
      <div className="flex gap-x-2 items-center justify-evenly w-full mt-2">
        <ProductModal product={product} />
        <Link
          to={`${ROUTES.EDITPRODUCT}/${product.id}`}
          className="text-white bg-orange-800 p-2 rounded-md capitalize w-1/3 text-center"
        >
          edit
        </Link>
        <button
          className="text-white bg-red-900 p-2 rounded-md capitalize w-1/3 text-center"
          onClick={() => deleteProduct({ id: product.id })}
        >
          delete
        </button>
      </div>
    </div>
  );
};
