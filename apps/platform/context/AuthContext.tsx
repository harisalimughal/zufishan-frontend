"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient, getAuthToken, setAuthToken, ApiError } from "../lib/apiClient";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  avatarUrl?: string;
  bio?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUserSession = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.get<any>("/auth/me");
      const userData = response.data || response.user || response;
      setUser(userData);
    } catch (err) {
      console.warn("Session restoration failed:", err);
      setAuthToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSession();

    const handleUnauthorized = () => {
      setUser(null);
      router.push("/login");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("unauthorized_session", handleUnauthorized);
      return () => {
        window.removeEventListener("unauthorized_session", handleUnauthorized);
      };
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<any>("/auth/login", { email, password });
    const payload = response.data || response;
    const token = payload.tokens?.accessToken || payload.accessToken || payload.token;
    const refreshToken = payload.tokens?.refreshToken || payload.refreshToken;

    if (token) {
      setAuthToken(token);
      if (refreshToken && typeof window !== "undefined") {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    const userData = payload.user;
    if (userData) {
      setUser(userData);
    } else {
      await fetchUserSession();
    }
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    await apiClient.post<any>("/auth/register", data);
    await login(data.email, data.password);
  };

  const logout = async () => {
    try {
      const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
      await apiClient.post("/auth/logout", { refreshToken });
    } catch (err) {
      console.warn("Logout API warning:", err);
    } finally {
      setAuthToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("refreshToken");
      }
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refetchUser: fetchUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
