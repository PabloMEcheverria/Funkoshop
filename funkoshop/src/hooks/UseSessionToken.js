import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';

export default function useSessionToken() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("token");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed?.user?.id || !parsed?.user2) {
          throw new Error("Token mal formado");
        }
        setToken(parsed);
      }
    } catch (e) {
      console.warn("⚠️ Token inválido. Limpiando sesión.");
      sessionStorage.removeItem("token");
      setToken(null);
      setError("Token inválido. Por favor iniciá sesión nuevamente.");
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token?.user2 && token?.user?.id) {
          const { data: user, error } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", token.user.id)
            .single();

          if (error) throw error;
          setUserData(user);
        }
      } catch (err) {
        console.error("Error al obtener el perfil:", err.message);
        setError("No se pudo cargar el perfil de usuario.");
      }
    };

    if (token) fetchUserData();
  }, [token]);

  return { token, setToken, userData, error };
}