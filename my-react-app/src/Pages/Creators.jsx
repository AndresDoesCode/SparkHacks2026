import { useState, useEffect } from "react";
import socket from '../Components/Socket';
import '../Styles/Creators.css';
import { Link } from "react-router-dom";

function Creators(){
    const [creators, setCreators] = useState([]);

    useEffect(() =>
    {
        socket.on("Retrieve_Creators", (Creators) => {
            setCreators(Creators); 
            console.log(Creators);
        })

        return () => {
            socket.off('Retrieve_Creators');
        }
    }, [])

    return(
        <div className="creatorsContainer">
            <h1>{"Creators"}</h1>
            {/* <pre className="test">{JSON.stringify(creators, null, 2)}</pre> */}
            <div className="creatorScroll">
                {creators.map((creator) => (
                <div key={creator.id}>
                    <Link to={`creators${creator.id}`}>
                        <p>name: {creator.name}</p>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    )

}
export default Creators;