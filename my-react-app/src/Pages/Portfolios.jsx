import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolioByUserId, mockCreators } from '../data/mockData';
import PortfolioCard from '../Components/PortfolioCard';
import '../Styles/Portfolios.css';

function Portfolios(){
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        // Simulate loading delay for better UX
        setTimeout(() => {
            const portfolioData = getPortfolioByUserId(id);

            if (!portfolioData) {
                setError(true);
            } else {
                setPortfolio(portfolioData);
            }
            setLoading(false);
        }, 300);

    }, [id]);

    return (
        <div className="portfolio-page">
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading portfolio...</p>
                </div>
            ) : error || !portfolio ? (
                <div className="error-container">
                    <h2>Portfolio Not Found</h2>
                    <p>This creator hasn't created a portfolio yet.</p>
                </div>
            ) : (
                <>
                    <div className="portfolio-header">
                        <h1>{portfolio.name}</h1>
                        <p className="portfolio-description">{portfolio.description}</p>
                        <p className="portfolio-item-count">{portfolio.items.length} items</p>
                    </div>

                    <div className="portfolio-content">
                        {portfolio.items.length === 0 ? (
                            <div className="empty-state">
                                <h2>No work uploaded yet</h2>
                                <p>This creator hasn't added any portfolio items.</p>
                            </div>
                        ) : (
                            <div className="portfolio-grid">
                                {portfolio.items.map((item) => (
                                    <PortfolioCard key={item.id} item={{
                                        ...item,
                                        creatorId: portfolio.user_id,
                                        creatorName: portfolio.name.replace("'s Portfolio", ""),
                                        portfolioId: portfolio.id
                                    }} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Portfolios;
