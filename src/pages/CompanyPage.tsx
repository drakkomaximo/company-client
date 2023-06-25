import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCompany } from "../hooks/useCompany";
import { Company } from "../utils";
import { ProductsList } from "../components";

const CompanyPage = () => {
  const params = useParams();
  const { getCompanyById, updateCompanyId } = useCompany();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const checkCompanyById = async () => {
      if (params.id) {
        const company = await getCompanyById({ id: params.id });
        if (company) {
          setCompany(company);
          updateCompanyId({ id: company.id });
        }
      }
    };
    checkCompanyById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!company) return <h1>CompanyPage</h1>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <h1 className="uppercase text-2xl font-bold text-center text-white">Company name: {company.name}</h1>
        <h1 className="uppercase text-2xl font-bold text-center text-white">Company address: {company.address}</h1>
        <h1 className="uppercase text-2xl font-bold text-center text-white">Company NIT: {company.nit}</h1>
        <h1 className="uppercase text-2xl font-bold text-center text-white">Compnay phone: {company.phone}</h1>
      </div>
      <div className="w-full">
        <h1 className="uppercase text-center text-7xl font-bold my-3">Products list</h1>
        <ProductsList />
      </div>
    </div>
  );
};

export default CompanyPage;
