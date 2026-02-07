import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import socket from '../Components/Socket';
//I gotta recreate User to have bio, as well as pictures?? then put it into App.jsx and pass it down to Creators and Portfolios
function Portfolios(){
    const { id } = useParams()

    useEffect(() => {
      socket.emit("get_portfolio", id);  
      socket.on("Send_Portfolio", (data) => {
        console.log(data);
      });

      return () => {
        socket.off("Send_Portfolio");
      }
    },[id])
    return(
        <div>
            <h1>Portfolios Page</h1>
        </div>
    )
}
export default Portfolios;