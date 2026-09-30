import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== allowedRole) {

        if (role === "user") {
            return <Navigate to="/user/UserDashboard" />;
        }

        if (role === "admin") {
            return <Navigate to="/admin/AdminDashboard" />;
        }

        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;