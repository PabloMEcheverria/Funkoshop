import React, { useState, useEffect, createContext } from 'react';
import supabase from '../config/supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
        return;
      }
      if (user) {
        console.log('Logged in user:', user);
        setUser(user);

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          console.log('User profile:', profile);
          setUserProfile(profile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, userProfile, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;