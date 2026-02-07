// Mock data for creators and portfolios
// This replaces the need for backend database seeding

export const mockCreators = [
    { id: 1, name: "Alex Chen" },
    { id: 2, name: "Jordan Smith" },
    { id: 3, name: "Sam Rivera" }
];

export const mockPortfolios = [
    {
        id: 1,
        user_id: 1,
        name: "Alex Chen's Portfolio",
        description: "Digital artist and photographer exploring urban landscapes",
        items: [
            {
                id: 1,
                type: "image",
                url: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800",
                title: "City Lights",
                description: "Night photography of downtown skyline"
            },
            {
                id: 2,
                type: "video",
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                title: "Urban Motion",
                description: "Time-lapse of city life"
            },
            {
                id: 3,
                type: "image",
                url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
                title: "Reflections",
                description: "Architecture and light"
            },
            {
                id: 4,
                type: "pdf",
                url: "https://example.com/portfolio.pdf",
                title: "Portfolio Collection",
                description: "Complete works from 2024"
            }
        ]
    },
    {
        id: 2,
        user_id: 2,
        name: "Jordan Smith's Portfolio",
        description: "Filmmaker and content creator specializing in documentaries",
        items: [
            {
                id: 5,
                type: "video",
                url: "https://www.youtube.com/embed/C0DPdy98e4c",
                title: "Documentary Short",
                description: "A story about community"
            },
            {
                id: 6,
                type: "image",
                url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
                title: "Behind the Scenes",
                description: "Production stills from latest project"
            },
            {
                id: 7,
                type: "script",
                url: "https://example.com/script.pdf",
                title: "Screenplay Draft",
                description: "Original screenplay for upcoming film"
            }
        ]
    },
    {
        id: 3,
        user_id: 3,
        name: "Sam Rivera's Portfolio",
        description: "Writer and illustrator creating visual stories",
        items: [
            {
                id: 8,
                type: "image",
                url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
                title: "Character Design",
                description: "Concept art for graphic novel"
            },
            {
                id: 9,
                type: "script",
                url: "https://example.com/story.pdf",
                title: "Short Story Collection",
                description: "Published works from 2024"
            },
            {
                id: 10,
                type: "image",
                url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
                title: "Portrait Series",
                description: "Character studies and expressions"
            }
        ]
    }
];

// Helper function to get portfolio by user ID
export const getPortfolioByUserId = (userId) => {
    return mockPortfolios.find(portfolio => portfolio.user_id === parseInt(userId));
};

// Helper function to get all portfolio items with creator info
export const getAllPortfolioItems = () => {
    const allItems = [];

    mockPortfolios.forEach(portfolio => {
        const creator = mockCreators.find(c => c.id === portfolio.user_id);
        const creatorName = creator ? creator.name : 'Unknown Creator';

        portfolio.items.forEach(item => {
            allItems.push({
                ...item,
                creatorId: portfolio.user_id,
                creatorName: creatorName,
                portfolioId: portfolio.id
            });
        });
    });

    return allItems;
};
