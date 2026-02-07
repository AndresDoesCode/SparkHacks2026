import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const loggedIn = localStorage.getItem("token");

    if (!loggedIn) {
        return <Navigate to="/log-in" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
