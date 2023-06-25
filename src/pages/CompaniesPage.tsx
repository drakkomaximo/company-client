import { useEffect } from "react";
import { useCompany } from "../hooks/useCompany";
import { CompanyCard } from "../components";

const CompaniesPage = () => {
  const { getCompanies, companies } = useCompany();

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (companies.length === 0) return <h1>No companies created</h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-2">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompaniesPage;
