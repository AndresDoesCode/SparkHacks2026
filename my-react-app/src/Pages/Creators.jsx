import { useState, useEffect } from "react";
import { mockCreators } from '../data/mockData';
import '../Styles/Creators.css';
import { Link } from "react-router-dom";

function Creators(){
    const [creators, setCreators] = useState([]);

    useEffect(() =>
    {
        // Load creators from mock data
        setCreators(mockCreators);
        console.log('Loaded creators:', mockCreators);
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