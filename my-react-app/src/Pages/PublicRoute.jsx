import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
    const loggedIn = localStorage.getItem("token");

    if (loggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
