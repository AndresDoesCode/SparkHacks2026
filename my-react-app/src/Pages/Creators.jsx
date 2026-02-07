import { useState, useEffect } from "react";
import { mockCreators } from '../data/mockData';
import '../Styles/Creators.css';
import { Link } from "react-router-dom";

function Creators() {
    const [creators, setCreators] = useState([]);

    useEffect(() =>
    {
        // Load creators from mock data
        setCreators(mockCreators);
        console.log('Loaded creators:', mockCreators);
    }, [])

    return (
        <div className="creatorsContainer">
            <h1>Creators</h1>
            <div className="creatorScroll">
                {creators.map((creator) => (
                    <div className="creatorBox" key={creator.id}>
                    <Link to={`/creators/${creator.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className="name">{creator.name}</p>
                            <p className="profession">{creator.ArtistType || 'Creator'}</p>
                            <p className="followers">Followers: {creator.Followers || 0}</p>
                    </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Creators;
