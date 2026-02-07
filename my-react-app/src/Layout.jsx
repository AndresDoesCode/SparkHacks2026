import "./Layout.css"
import { Link, Outlet, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import { useState, useEffect } from "react";

function Layout(){
    //let currentLocation = useLocation();
    const [name, setName] = useState(localStorage.getItem("token") ? "Dashboard" : "Log In");
    const location = useLocation();

    useEffect(() => {
        // Update name whenever location changes
        setName(localStorage.getItem("token") ? "Dashboard" : "Log In");
    }, [location]);

    useEffect(() => {
        const handleStorageChange = () => {
            setName(localStorage.getItem("token") ? "Dashboard" : "Log In");
        };

        // Listen to storage changes (in case token changes from another tab)
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return(
        <>
            <div id="Layout">
                <div className="NavBar">
                    <div className="NavBarElements">
                        <Link style={{ textDecoration: "none" }} to="/">
                                <p className="navBarFont">test</p>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/creators">
                                <p className="navBarFont">creators</p>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/">
                                <p className="navBarFont">test</p>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to={name === "Dashboard" ? "/dashboard" : "/log-in"}>
                            <p className="navBarFont">{name}</p>
                        </Link>
                    </div>
                </div>
                <div className="display">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}

export default Layout