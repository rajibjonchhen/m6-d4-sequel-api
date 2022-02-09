
    -- DROP TABLE IF EXISTS products;
    -- DROP TABLE IF EXISTS reviews;

    CREATE TABLE IF NOT EXISTS 
    products(
        product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        product_name VARCHAR(100) NOT NULL,
        product_description TEXT NOT NULL,
        brand VARCHAR(100) NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url VARCHAR(250) DEFAULT 'https://via.placeholder.com/150/000000/FFFFFF/?text=Product Image',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS 
    reviews(
        review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        comment TEXT NOT NULL,
        product_id INTEGER REFERENCES products(product_id) on DELETE CASCADE,
        rating INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );