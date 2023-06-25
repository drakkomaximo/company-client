import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CompaniesPage from "../pages/CompaniesPage";
import CompanyFormPage from "../pages/CompanyFormPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { ROUTES } from "../utils";
import { Navbar } from "../components";
import ProfilePage from "../pages/ProfilePage";
import CompanyPage from "../pages/CompanyPage";
import ProductFormPage from "../pages/ProductFormPage";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-10 bg-zinc-500">
        <Navbar />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTERTEST} element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.CREATECOMPANY} element={<CompanyFormPage />} />
            <Route
              path={ROUTES.EDITCOMPANYBYID}
              element={<CompanyFormPage />}
            />
            <Route path={ROUTES.COMPANYBYID} element={<CompanyPage />} />
            <Route path={ROUTES.COMPANIES} element={<CompaniesPage />} />
            <Route path={ROUTES.CREATEPRODUCT} element={<ProductFormPage />} />
            <Route
              path={ROUTES.EDITPRODUCTBYID}
              element={<ProductFormPage />}
            />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default MainRoute;
