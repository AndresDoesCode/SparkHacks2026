import { useState, useEffect } from "react";
import socket from '../Components/Socket';
import '../Styles/Creators.css';
import { Link } from "react-router-dom";

function Creators() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        socket.on("Retrieve_Creators", (creators) => {
            setCreators(creators);
            console.log(creators);
        });

        return () => {
            socket.off("Retrieve_Creators");
        };
    }, []);

    return (
        <div className="creatorsContainer">
            <h1>Creators</h1>
            <div className="creatorScroll">
                {creators.map((creator) => (
                    <div className="creatorBox">
                    <Link key={creator.id || creator.name} to={`/creators/${creator.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="name">{creator.name}</p>
                            <p className="profession">{creator.ArtistType}</p>
                            <p className="followers">Followers: {creator.Followers}</p>
                    </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Creators;