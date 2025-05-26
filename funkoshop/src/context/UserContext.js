import { useState, useEffect, createContext, useContext } from 'react';
import supabase from '../config/supabaseClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [userRole, setUserRole] = useState({});
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
        return;
      }

      console.log("🔍 Usuario obtenido:", user);
      
      if (user) {
        setUser(user);

        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setUserProfile(profile);
        }

        const { data: role, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (roleError) {
          console.error('Error fetching role:', roleError);
        } else {
          setUserRole(role.role);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        console.log('Fetched products:', data);
        setProducts(data);
      }
      setLoadingProducts(false);
    };

  return (
    <UserContext.Provider value={{ 
      user, 
      userProfile, 
      userRole, 
      setUser, 
      setUserProfile, 
      setUserRole, 

      loading, 
      setLoading,
      
      products,
      loadingProducts,
      setProducts,
      setLoadingProducts, 
      fetchProducts}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
}