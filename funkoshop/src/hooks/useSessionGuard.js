// hooks/useSessionGuard.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../config/supabaseClient';

export const useSessionGuard = ({ inactivityMinutes = 30 } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 Definición local del helper
  const isGuestRoute = (pathname) =>
    ['/login', '/register', '/'].includes(pathname);

  useEffect(() => {
    let inactivityTimeout;

    const logout = async (reason = "inactividad") => {
      console.warn(`Cerrando sesión por ${reason}`);
      await supabase.auth.signOut();

      // Solo redirigir si no estamos en ruta pública
      if (!isGuestRoute(location.pathname)) {
        navigate('/login', { replace: true });
      }
    };

    const validateSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        await logout("sesión inválida");
      } else if (session.expires_at * 1000 < Date.now()) {
        await logout("expiración");
      }
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => logout("inactividad"), inactivityMinutes * 60 * 1000);
    };

    const handleUnload = () => {
      supabase.auth.signOut();
    };

    // Solo activar guard si no estamos en ruta pública
    if (!isGuestRoute(location.pathname)) {
      validateSession();
      resetInactivityTimer();

      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);
      window.addEventListener('scroll', resetInactivityTimer);
      window.addEventListener('beforeunload', handleUnload);
    }

    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [navigate, location.pathname, inactivityMinutes]);
};