import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = "/not-found" }) => {
    const { user, userRole, loading } = useUser();

    if (loading) return <p>Cargando...</p>;

    if (!user) return <Navigate to="/login" />;

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};

export default ProtectedRoute;