import { useForm, Controller } from "react-hook-form";
import { Product, ROUTES } from "../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useCompany } from "../hooks/useCompany";

const ProductFormPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Product>();
  const {
    errors: productFormErrors,
    createProduct,
    getProductById,
    updateProduct,
  } = useProduct();
  const { companyId } = useCompany();

  const onSubmit = handleSubmit(async (product) => {
    if (params.id) {
      updateProduct({ product });
    } else {
      if (companyId) {
        createProduct({ companyId, product });
      }
    }
    navigate(`${ROUTES.COMPANY}/${companyId}`);
  });

  useEffect(() => {
    const checkProductById = async () => {
      if (params.id) {
        const product = await getProductById({ id: params.id });
        if (product) {
          setValue("name", product.name);
          setValue("id", product.id);
          setValue("price", product.price);
          setValue("quantity", product.quantity);
          setValue("description", product.description);
          /*           setValue("image", product.image); */
          setValue("companyId", product.companyId);
        }
      }
    };
    checkProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {productFormErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-white text-center">
          {params.id ? "Edit" : "Create"} product
        </h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full justify-center items-center"
        >
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Product name"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.name && (
            <p className="text-red-500">Product name is required</p>
          )}
          <input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
            placeholder="Product price"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.price && (
            <p className="text-red-500">Product price is required</p>
          )}
          <input
            type="number"
            {...register("quantity", { required: true, valueAsNumber: true })}
            placeholder="Product quantity"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.quantity && (
            <p className="text-red-500">Product quantity is required</p>
          )}
          <textarea
            {...register("description", { required: true })}
            placeholder="Product description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500">Product description is required</p>
          )}

          {!params.id && (
            <Controller
              control={control}
              name={"image"}
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <input
                    {...field}
                    value={value?.fileName}
                    onChange={(event) => {
                      if (event.target.files[0]) {
                        onChange(event.target.files[0]);
                      }
                    }}
                    type="file"
                    id="picture"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  />
                );
              }}
            />
          )}

          {errors.image && (
            <p className="text-red-500">Product image is required</p>
          )}
          <div className="flex justify-evenly w-full mt-2">
            <button type="submit" className="bg-amber-800 p-2 rounded-sm">
              {params.id ? "Edit" : "Create"}
            </button>
            <Link
              to={`${ROUTES.COMPANY}/${companyId}`}
              className="bg-red-800 p-2 rounded-sm"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;
