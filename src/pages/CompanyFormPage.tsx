import { useForm } from "react-hook-form";
import { Company, ROUTES } from "../utils";
import { useCompany } from "../hooks/useCompany";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const CompanyFormPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>();
  const {
    errors: companyFormErrors,
    createCompany,
    getCompanyById,
    updateCompany,
  } = useCompany();

  const onSubmit = handleSubmit(async (company) => {
    if (params.id) {
      updateCompany({ company });
    } else {
      createCompany({ company });
    }
    navigate(ROUTES.COMPANIES);
  });

  useEffect(() => {
    const checkCompanyById = async () => {
      if (params.id) {
        const company = await getCompanyById({ id: params.id });
        if (company) {
          setValue("name", company.name);
          setValue("address", company.address);
          setValue("id", company.id);
          setValue("nit", company.nit);
          setValue("phone", company.phone);
          setValue("userId", company.userId);
        }
      }
    };
    checkCompanyById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {companyFormErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-white text-center">
          {params.id ? "Edit" : "Create"} company
        </h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full justify-center items-center"
        >
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Company name"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.name && (
            <p className="text-red-500">Comapny name is required</p>
          )}
          <input
            type="text"
            {...register("address", { required: true })}
            placeholder="Company address"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.address && (
            <p className="text-red-500">Company address is required</p>
          )}
          <input
            type="text"
            {...register("nit", { required: true })}
            placeholder="Compnay NIT"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.nit && (
            <p className="text-red-500">Company NIT is required</p>
          )}
          <input
            type="text"
            {...register("phone", { required: true })}
            placeholder="Comany phone"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.phone && (
            <p className="text-red-500">Company phone is required</p>
          )}
          <div className="flex justify-evenly w-full mt-2">
            <button type="submit" className="bg-amber-800 p-2 rounded-sm">
              {params.id ? "Edit" : "Create"}
            </button>
            <Link to={ROUTES.COMPANIES} className="bg-red-800 p-2 rounded-sm">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyFormPage;
