import "./Layout.css"
import { Link, Outlet, useLocation } from "react-router-dom";

function Layout(){
    //let currentLocation = useLocation();

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
                        <Link style={{ textDecoration: "none" }} to="/log-in">
                                <p className="navBarFont">Log In</p>
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