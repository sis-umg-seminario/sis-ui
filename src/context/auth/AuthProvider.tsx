import type { User } from "@/types/auth/User";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "@/services/auth/authService";
import { decodeJwtPayload } from "@/utils/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        const payload = decodeJwtPayload<User>(token);

        if (payload.exp * 1000 > Date.now()) {
          setUser(parsed);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }

    setLoadingAuth(false);
  }, []);

  useEffect(() => {
    function handleExpired() {
      logout();
    }

    window.addEventListener("auth-expired", handleExpired);
    return () => window.removeEventListener("auth-expired", handleExpired);
  }, []);

  const login = async (email: string, password: string) => {
    const loginResponse = await authService.login(email, password);

    const payload = decodeJwtPayload<User>(loginResponse.accessToken);
    setUser(payload);

    localStorage.setItem("user", JSON.stringify(payload));
    localStorage.setItem("accessToken", loginResponse.accessToken);
    localStorage.setItem("refreshToken", loginResponse.refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
};
