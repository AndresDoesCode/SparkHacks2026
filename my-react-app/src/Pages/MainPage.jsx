// import React from "react";
// import '../Styles/MainPage.css';

// function MainPage(){
//     return(
//         <>
//         <div className="MainPageContainer">
//             <h1 className="MainPageTitle">CREATExCONNECTxCOLLAB</h1>
//         </div>
//         </>
//     )
// }

// export default MainPage

import { useState, useEffect } from "react";
import socket from '../Socket';
import MasonryGrid from '../Components/MasonryGrid';
import '../Styles/MainPage.css';

function MainPage(){
    const [creators, setCreators] = useState([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);

    useEffect(() => {
        // Reset state when component mounts
        setCreators([]);
        setPortfolioItems([]);
        setLoading(true);
        setLoadedCount(0);

        let creatorListCache = [];

        // Listen for creators list (auto-sent on connect)
        const handleRetrieveCreators = (creatorList) => {
            console.log('Received creators:', creatorList);
            creatorListCache = creatorList;
            setCreators(creatorList);

            // Fetch portfolios for each creator with delay
            creatorList.forEach((creator, index) => {
                // Skip creators without valid IDs
                if (!creator || !creator.id) {
                    console.warn('Skipping creator without valid ID:', creator);
                    setLoadedCount(prev => prev + 1); // Increment counter to prevent hanging
                    return;
                }

                setTimeout(() => {
                    socket.emit('get_portfolio', { id: creator.id });
                }, index * 50); // 50ms delay between requests
            });
        };

        // Listen for individual portfolio responses
        const handleSendPortfolio = (portfolioData) => {
            if (!portfolioData || !portfolioData.items) {
                console.warn('No portfolio data received');
                setLoadedCount(prev => prev + 1);
                return;
            }

            console.log('Received portfolio:', portfolioData);

            // Find creator name from cached list
            const creator = creatorListCache.find(c => c.id === portfolioData.user_id);
            const creatorName = creator ? creator.name : 'Unknown Creator';

            // Enrich items with creator metadata
            const enrichedItems = portfolioData.items.map(item => ({
                ...item,
                creatorId: portfolioData.user_id || creator?.id,
                creatorName: creatorName,
                portfolioId: portfolioData.id
            }));

            // Add to portfolio items
            setPortfolioItems(prev => [...prev, ...enrichedItems]);
            setLoadedCount(prev => prev + 1);
        };

        socket.on('Retrieve_Creators', handleRetrieveCreators);
        socket.on('Send_Portfolio', handleSendPortfolio);

        // If socket is already connected, disconnect and reconnect to trigger 'connect' event
        if (socket.connected) {
            socket.disconnect();
            socket.connect();
        }

        // Timeout to stop loading after 10 seconds
        const timeout = setTimeout(() => {
            setLoading(false);
            console.log('Portfolio loading timed out');
        }, 10000);

        return () => {
            socket.off('Retrieve_Creators', handleRetrieveCreators);
            socket.off('Send_Portfolio', handleSendPortfolio);
            clearTimeout(timeout);
        };
    }, []); // Empty dependency array - only run once on mount

    // Stop loading when all portfolios are fetched
    useEffect(() => {
        if (creators.length > 0 && loadedCount >= creators.length) {
            setLoading(false);
        }
    }, [loadedCount, creators.length]);

    return(
        <>
        <div className="MainPageContainer">
            <h1 className="MainPageTitle">CREATExCONNECTxCOLLAB</h1>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading portfolios... ({loadedCount}/{creators.length})</p>
                </div>
            ) : (
                <MasonryGrid portfolioItems={portfolioItems} />
            )}
        </div>
        </>
    )
}

export default MainPage