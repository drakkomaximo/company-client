import { Company, CompanyApiResponse, ROUTES } from "../utils";
import axiosIntance from "./axios";

export const getCompaniesRequest = async () => {
  try {
    const resp = await axiosIntance.get<CompanyApiResponse[]>(ROUTES.COMPANIES);
    if (resp.status === 200) {
      return resp.data;
    }
  } catch (error) {
    return [];
  }
};

export const getCompanyByIdRequest = async ({ id }: { id: string }) =>{
  try {
    const resp = await axiosIntance.get<CompanyApiResponse>(`${ROUTES.COMPANY}/${id}`);
    if (resp.status === 200) {
      return resp.data;
    }
  } catch (error) {
    return null;
  }
}

export const createCompanyRequest = async ({ company }: { company: Company }) =>
  axiosIntance.post(ROUTES.COMPANY, company);

export const updateCompanyRequest = async ({ company }: { company: Company }) =>
  axiosIntance.put(`${ROUTES.COMPANY}/${company.id}`, company);

export const deleteCompanyRequest = async ({ id }: { id: string }) =>
  axiosIntance.delete(`${ROUTES.COMPANY}/${id}`);
