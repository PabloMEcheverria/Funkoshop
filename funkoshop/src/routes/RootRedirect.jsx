import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RootRedirect = () => {
    const { user, loading } = useUser();
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    return user ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

export default RootRedirect;