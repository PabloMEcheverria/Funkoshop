import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';

const RootRedirect = () => {
  const { user, loading } = useUser();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("id", user.id);

      if (!profile?.length) {
        const pending = JSON.parse(localStorage.getItem("pendingProfile") || "{}");

        await supabase.from("user_profiles").upsert({
          id: user.id,
          email: user.email,
          name: pending.name || "",
          last_name: pending.lastName || "",
        });

        await supabase.from("user_roles").upsert({
          id: user.id,
          role: "user",
        });

        localStorage.removeItem("pendingProfile");
      }

      setInitializing(false);
    };

    if (!loading) initializeUser();
  }, [user, loading]);

  if (loading || initializing) {
    return <p>Loading...</p>;
  }

  return user ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

export default RootRedirect;