from main import app, db, User, Portfolios, PortfolioItem

with app.app_context():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Create sample users
    users = [
        User(name="Alex Chen", password="demo123", public=True),
        User(name="Jordan Rivera", password="demo123", public=True),
        User(name="Taylor Morgan", password="demo123", public=True),
        User(name="Casey Kumar", password="demo123", public=True),
    ]

    for user in users:
        db.session.add(user)
    db.session.commit()

    # Create portfolios for each user
    portfolios = []
    for user in users:
        portfolio = Portfolios(
            user_id=user.id,
            name=f"{user.name}'s Portfolio",
            description=f"Creative works by {user.name}"
        )
        db.session.add(portfolio)
        portfolios.append(portfolio)
    db.session.commit()

    # Sample portfolio items - varied types and content (reduced to 3-4 per creator)
    sample_items = [
        # Alex Chen - Photographer (3 images)
        {"type": "image", "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
         "title": "Abstract Patterns", "description": "Geometric composition exploring light and shadow"},
        {"type": "image", "url": "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
         "title": "Portrait Study", "description": "Character design and lighting exploration"},
        {"type": "image", "url": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
         "title": "Urban Landscapes", "description": "City architecture at golden hour"},

        # Jordan Rivera - Filmmaker (4 items: 2 videos, 2 images)
        {"type": "video", "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
         "title": "Animation Showreel", "description": "3D animation and motion graphics compilation"},
        {"type": "image", "url": "https://images.unsplash.com/photo-1485846234645-a62644f84728",
         "title": "Film Stills", "description": "Behind the scenes production photography"},
        {"type": "video", "url": "https://www.youtube.com/embed/jNQXAC9IVRw",
         "title": "Short Film: Reflections", "description": "A 5-minute narrative about self-discovery"},
        {"type": "image", "url": "https://images.unsplash.com/photo-1574267432644-f74f8ec55800",
         "title": "Cinematography Breakdown", "description": "Color grading before and after"},

        # Taylor Morgan - Writer (3 items: 2 scripts, 1 pdf)
        {"type": "script", "url": "/scripts/sci-fi-short.pdf",
         "title": "Echoes in the Void", "description": "Sci-fi short film script, 22 pages"},
        {"type": "pdf", "url": "/docs/poetry-collection.pdf",
         "title": "Urban Soliloquies", "description": "Poetry collection about city life"},
        {"type": "script", "url": "/scripts/drama-pilot.pdf",
         "title": "The Last Train Home", "description": "TV pilot episode, drama series"},

        # Casey Kumar - Multidisciplinary (4 items: mixed)
        {"type": "image", "url": "https://images.unsplash.com/photo-1561998338-13ad7883b20f",
         "title": "Digital Art: Dreamscape", "description": "Surreal digital painting"},
        {"type": "video", "url": "https://www.youtube.com/embed/jfKfPfyJRdk",
         "title": "Interactive Installation", "description": "Documentation of multimedia art piece"},
        {"type": "pdf", "url": "/docs/design-portfolio.pdf",
         "title": "Brand Identity Project", "description": "Complete brand design case study"},
        {"type": "image", "url": "https://images.unsplash.com/photo-1523726491678-bf852e717f6a",
         "title": "Illustration Series", "description": "Character design for graphic novel"},
    ]

    # Distribute items to portfolios
    # Alex Chen gets items 0-2 (3 images)
    for i in range(3):
        item = sample_items[i]
        portfolio_item = PortfolioItem(
            portfolio_id=portfolios[0].id,
            type=item["type"],
            url=item["url"],
            title=item["title"],
            description=item["description"]
        )
        db.session.add(portfolio_item)

    # Jordan Rivera gets items 3-6 (4 items)
    for i in range(3, 7):
        item = sample_items[i]
        portfolio_item = PortfolioItem(
            portfolio_id=portfolios[1].id,
            type=item["type"],
            url=item["url"],
            title=item["title"],
            description=item["description"]
        )
        db.session.add(portfolio_item)

    # Taylor Morgan gets items 7-9 (3 items)
    for i in range(7, 10):
        item = sample_items[i]
        portfolio_item = PortfolioItem(
            portfolio_id=portfolios[2].id,
            type=item["type"],
            url=item["url"],
            title=item["title"],
            description=item["description"]
        )
        db.session.add(portfolio_item)

    # Casey Kumar gets items 10-13 (4 items)
    for i in range(10, 14):
        item = sample_items[i]
        portfolio_item = PortfolioItem(
            portfolio_id=portfolios[3].id,
            type=item["type"],
            url=item["url"],
            title=item["title"],
            description=item["description"]
        )
        db.session.add(portfolio_item)

    db.session.commit()
    print("Database seeded successfully!")
    print(f"Created {len(users)} users")
    print(f"Created {len(portfolios)} portfolios")
    print(f"Created 14 portfolio items")
