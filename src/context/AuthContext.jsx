import { createContext, useContext, useMemo, useState } from "react";
import { apiRequest, getStoredAuth } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = async (email, password) => {
    const nextAuth = await apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("vegimartAuth", JSON.stringify(nextAuth));
    setAuth(nextAuth);
    return nextAuth.user;
  };

  const register = async (firstName, lastName, email, password) => {
    const nextAuth = await apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    localStorage.setItem("vegimartAuth", JSON.stringify(nextAuth));
    setAuth(nextAuth);
    return nextAuth.user;
  };

  const logout = () => {
    localStorage.removeItem("vegimartAuth");
    setAuth(null);
  };

  const value = useMemo(
    () => ({
      user: auth?.user || null,
      token: auth?.token || null,
      isAdmin: auth?.user?.role === "admin",
      login,
      register,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
