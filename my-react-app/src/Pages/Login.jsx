import {useEffect, useState} from "react";
import socket from '../Components/Socket';
import '../Styles/Login.css';
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    useEffect(()=>{
        socket.on("Login_success", (token) => {
            // store token
            localStorage.setItem("token", token);

            // redirect
            navigate("/dashboard");
        });

        socket.on("Login_failed", (message) => {
            alert(message || "Login failed");
        });

        // cleanup listeners
        return () => {
            socket.off("Login_success");
            socket.off("Login_failed");
        };
    }, [navigate])


    function onClickHandler(){
        socket.emit('Login', {user, password});
    }
    function onUserChangeHandler(event){
        setUser(event.target.value);
    }
    function onPasswordChangeHandler(event){
        setPassword(event.target.value);
    }
    return(
        <div className='LogInContainer'>
            <div>
                <h1 className="LogInTitle">
                    Log In
                </h1>
            </div>
            <div className='LogInArea'>
                <input placeholder="User name" value={user} onChange={onUserChangeHandler} />
                <input type="password" placeholder="Password" value={password} onChange={onPasswordChangeHandler} />
                <button onClick={onClickHandler}>Login</button>
                <Link style={{ textDecoration: "none"}} to="/sign-up">
                    New User? Type a name and it will be created for you!
                </Link>
                
            </div>
        </div>

    )

}
export default Login;