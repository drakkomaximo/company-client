import { FC } from "react";
import { CompanyCardProps, ROUTES } from "../utils";
import { useCompany } from "../hooks/useCompany";
import { Link } from "react-router-dom";

export const CompanyCard: FC<CompanyCardProps> = ({ company }) => {
  const { deleteCompany } = useCompany();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-4 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold text-white capitalize">
            {company.name}
          </h1>
        </header>
        <p className="text-white">NIT: {company.nit}</p>
      </div>
      <div className="flex gap-x-2 items-center justify-evenly w-full mt-2">
        <Link
          to={`${ROUTES.COMPANY}/${company.id}`}
          className="text-white bg-green-800 p-2 rounded-md capitalize w-1/3 text-center"
        >
          view
        </Link>
        <Link
          to={`${ROUTES.EDITCOMPANY}/${company.id}`}
          className="text-white bg-orange-800 p-2 rounded-md capitalize w-1/3 text-center"
        >
          edit
        </Link>
        <button
          className="text-white bg-red-900 p-2 rounded-md capitalize w-1/3 text-center"
          onClick={() => deleteCompany({ id: company.id })}
        >
          delete
        </button>
      </div>
    </div>
  );
};
