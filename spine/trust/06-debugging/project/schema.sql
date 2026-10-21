CREATE TABLE IF NOT EXISTS order_lines (
    order_id TEXT PRIMARY KEY,
    date     TEXT NOT NULL,
    customer TEXT NOT NULL,
    sku      TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    total    TEXT NOT NULL  -- a Decimal, as text
);
