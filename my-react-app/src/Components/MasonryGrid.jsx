import PortfolioCard from './PortfolioCard';

function MasonryGrid({ portfolioItems }) {
    if (portfolioItems.length === 0) {
        return (
            <div className="empty-state">
                <h2>No portfolios available yet</h2>
                <p>Check back soon for creative works from our community!</p>
            </div>
        );
    }

    return (
        <div className="masonry-grid">
            {portfolioItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
            ))}
        </div>
    );
}

export default MasonryGrid;
