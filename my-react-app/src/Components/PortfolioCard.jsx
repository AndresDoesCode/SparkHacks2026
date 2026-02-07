import { useNavigate } from 'react-router-dom';
import '../Styles/PortfolioCard.css';

function PortfolioCard({ item }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/creators/${item.creatorId}`);
    };

    const renderMedia = () => {
        switch (item.type) {
            case 'image':
                return (
                    <img
                        src={item.url}
                        alt={item.title}
                        className="card-media image"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                    />
                );

            case 'video':
                return (
                    <iframe
                        src={item.url}
                        className="card-media video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={item.title}
                    />
                );

            case 'script':
                return (
                    <div className="card-script">
                        <div className="card-script-icon">📄</div>
                        <h3 className="card-type-title">{item.title}</h3>
                        <p className="card-type-desc">{item.description}</p>
                    </div>
                );

            case 'pdf':
                return (
                    <div className="card-pdf">
                        <div className="card-pdf-icon">📋</div>
                        <h3 className="card-type-title">{item.title}</h3>
                        <p className="card-type-desc">{item.description}</p>
                    </div>
                );

            default:
                return (
                    <div className="card-unknown">
                        <p>Unsupported media type: {item.type}</p>
                    </div>
                );
        }
    };

    return (
        <div className="portfolio-card masonry-item" onClick={handleClick}>
            {renderMedia()}
            <div className="card-overlay">
                <h3 className="card-title">{item.title}</h3>
                {item.description && <p className="card-description">{item.description}</p>}
                <p className="card-creator">by {item.creatorName}</p>
            </div>
            <div className="card-type-badge">{item.type}</div>
        </div>
    );
}

export default PortfolioCard;
