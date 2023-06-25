import { createContext, useState } from "react";
import { Company, ContextCompany } from "../utils";
import {
  createCompanyRequest,
  deleteCompanyRequest,
  getCompaniesRequest,
  getCompanyByIdRequest,
  updateCompanyRequest,
} from "../api/company";

export const CompanyContext = createContext({} as ContextCompany);

export const CompanyProvider = ({ children }: { children: JSX.Element }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [errors] = useState<string[]>([]);

  const getCompanies = async () => {
    try {
      const res = await getCompaniesRequest();
      if (res && res.length > 0) {
        const formatedCompanies: Company[] = res.map((company) => ({
          id: company._id,
          address: company.address,
          name: company.name,
          nit: company.nit,
          phone: company.phone,
          userId: company.user._id,
        }));
        setCompanies(formatedCompanies);
      }else{
        setCompanies([]);
      }
    } catch (error) {
      setCompanies([]);
    }
  };

  const getCompanyById = async ({ id }: { id: string }) => {
    try {
      const res = await getCompanyByIdRequest({ id });
      if (res) {
        const formatedCompany: Company = {
          id: res._id,
          address: res.address,
          name: res.name,
          nit: res.nit,
          phone: res.phone,
          userId: res.user._id,
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

  const createCompany = async ({ company }: { company: Company }) => {
    try {
      await createCompanyRequest({ company });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCompany = async ({ id }: { id: string }) => {
    try {
      const res = await deleteCompanyRequest({ id });
      if (res.status === 204) {
        setCompanies(companies.filter((company) => company.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompany = async ({ company }: { company: Company }) => {
    try {
      await updateCompanyRequest({ company });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompanyId = ({id}:{id: string | null}) =>{
    setCompanyId(id)
  }

  return (
    <CompanyContext.Provider
      value={{
        companies,
        companyId,
        errors,
        createCompany,
        getCompanies,
        getCompanyById,
        deleteCompany,
        updateCompany,
        updateCompanyId,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
