import { useState, useEffect}  from "react";
import socket from '../Components/Socket';
import '../Styles/SignUp.css';
import {useNavigate} from 'react-router-dom';

function SignUp(){

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("Sign_up_success", (token) => {
            // store token
            localStorage.setItem("token", token);

            // redirect
            navigate("/dashboard");
        });

        socket.on("Sign_up_error", (message) => {
            alert(message);
        });

        // cleanup listeners
        return () => {
            socket.off("Sign_up_success");
            socket.off("Sign_up_error");
        };
    }, [navigate]);



    const usernameChange = ({target}) => {
        setUserName(target.value); // update state when input changes
    };
    const passwordChange = ({target}) =>{
        setPassword(target.value);
    }

    function onClickHandler(){
        socket.emit('Sign_up', {username, password});
        // localStorage.setItem("token", response.token);


        
        // navigate("/")

    }
    
    return(
        <div className="signUpContainer">
            <h1 className="signUpTitle">Sign Up</h1>
            <div className="signUpArea">
                <input placeholder="User name" value={username} onChange={usernameChange} />
                <input type="password" placeholder="Password" value={password} onChange={passwordChange} />
                <button onClick={onClickHandler}>Sign Up</button>
            </div>
        </div>
    )

}

export default SignUp;