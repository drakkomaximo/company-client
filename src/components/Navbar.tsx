import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../utils";
import { useAuth } from "../hooks/useAuth";
import { useCompany } from "../hooks/useCompany";
import { useProduct } from "../hooks/useProduct";

export const Navbar = () => {
  const { user, isAuthenticated, logOut } = useAuth();
  const { updateCompanyId } = useCompany();
  const { clearProducts } = useProduct();
  const location = useLocation();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
      {isAuthenticated && user ? (
        <Link
          to={isAuthenticated ? ROUTES.PROFILE : ROUTES.HOME}
          onClick={() => updateCompanyId({ id: null })}
        >
          <h1 className="text-2xl text-white font-bold capitalize">
            Hola, {user.username || "desconocido"}
          </h1>
        </Link>
      ) : (
        <Link to={ROUTES.HOME}>
          <h1 className="text-2xl text-white font-bold">CRUD MERN</h1>
        </Link>
      )}
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            {location.pathname.includes(ROUTES.COMPANIES) && (
              <li className="text-white font-bold">
                <Link
                  to={ROUTES.CREATECOMPANY}
                  className="bg-amber-800 p-2 rounded-sm"
                >
                  Create company
                </Link>
              </li>
            )}
            {location.pathname.includes(`${ROUTES.COMPANY}/`) && (
              <>
                <li className="text-white font-bold">
                  <Link
                    to={ROUTES.COMPANIES}
                    className="bg-amber-800 p-2 rounded-sm"
                    onClick={() => {
                      updateCompanyId({ id: null });
                      clearProducts();
                    }}
                  >
                    Companies list
                  </Link>
                </li>
                <li className="text-white font-bold">
                  <Link
                    to={ROUTES.CREATEPRODUCT}
                    className="bg-amber-800 p-2 rounded-sm"
                  >
                    Create product
                  </Link>
                </li>
              </>
            )}
            <li className="text-white font-bold">
              <Link
                to={ROUTES.HOME}
                onClick={logOut}
                className="bg-amber-800 p-2 rounded-sm"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-white font-bold">
              <Link to={ROUTES.LOGIN} className="bg-amber-800 p-2 rounded-sm">
                Login
              </Link>
            </li>
            <li className="text-white font-bold">
              <Link
                to={ROUTES.REGISTERTEST}
                className="bg-amber-800 p-2 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
