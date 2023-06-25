import { AuthProvider } from "./context/AuthContext";
import { CompanyProvider } from "./context/CompanyContext";
import { ProductProvider } from "./context/ProductContext";
import MainRoute from "./routes/MainRoute";

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <ProductProvider>
          <MainRoute />
        </ProductProvider>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;
