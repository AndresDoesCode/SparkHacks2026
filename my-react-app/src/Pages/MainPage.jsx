import { useState, useEffect } from "react";
import MasonryGrid from '../Components/MasonryGrid';
import { getAllPortfolioItems } from '../data/mockData';
import '../Styles/MainPage.css';

function MainPage(){
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay for better UX
        setLoading(true);

        setTimeout(() => {
            // Load all portfolio items from mock data
            const items = getAllPortfolioItems();
            setPortfolioItems(items);
            setLoading(false);
        }, 500); // Short delay to show loading state

    }, []); // Empty dependency array - only run once on mount

    return(
        <>
        <div className="MainPageContainer">
            <h1 className="MainPageTitle">CREATExCONNECTxCOLLAB</h1>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading portfolios...</p>
                </div>
            ) : (
                <MasonryGrid portfolioItems={portfolioItems} />
            )}
        </div>
        </>
    )
}

export default MainPage