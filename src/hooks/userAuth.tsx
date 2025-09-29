import { useState, useEffect } from "react";
import type { Profile } from "@/types/userProfileInterface";
import type { LoginResponse } from "@/types/loginResposeInterface";
import api from "@/services/axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token && !profile) {
      fetchProfile();
    }
  }, [profile]);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const { data } = await api.post<LoginResponse>("/auth/login/", { email, password });
      localStorage.setItem("access-token", data.tokens.access);
      await fetchProfile();
      return true;
    } catch (err: any) {
      const message =
        err.response?.status === 400
          ? "Credenciais inválidas. Verifique email e senha."
          : err.response?.status === 401
          ? "Não autorizado. Verifique suas credenciais."
          : err.response?.status === 403
          ? "Acesso proibido. Contate o suporte."
          : err.response?.data?.detail || "Erro ao fazer login.";
      setError(message);
      localStorage.removeItem("access-token");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    setProfile(null);
    setError(null);
    navigate("/login", { replace: true });
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get<Profile>("/auth/profile/");
      setProfile(data);
      setError(null);
    } catch (err: any) {
      setError("Erro ao carregar perfil. Sessão pode estar expirada.");
      logout();
    }
  };

  const fetchProfileData = async () => {
    const { data } = await api.get<Profile>("/auth/profile/");
    return data;
  };

  return { profile, error, login, logout, fetchProfile, fetchProfileData };
};