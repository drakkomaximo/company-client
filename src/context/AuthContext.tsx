import { createContext, useState, useEffect } from "react";
import { ContextAuth, User } from "../utils";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext({} as ContextAuth);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<null | User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const signup = async ({ user }: { user: User }) => {
    try {
      const res = await registerRequest({ user });
      if (res && res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
        return false;
      }
      setErrors([error.response.data.message]);
      return false;
    }
  };

  const signin = async ({ user }: { user: Omit<User, "username"> }) => {
    try {
      const res = await loginRequest({ user });
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logOut = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        errors,
        isLoading,
        signup,
        signin,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
