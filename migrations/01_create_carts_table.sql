-- Enable RLS
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_guest BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add cart_id to cart table
ALTER TABLE cart
ADD COLUMN cart_id UUID NOT NULL,
ADD CONSTRAINT fk_cart_id 
    FOREIGN KEY (cart_id) 
    REFERENCES carts(id) 
    ON DELETE CASCADE;

-- Create index for performance
CREATE INDEX idx_cart_cart_id ON cart(cart_id);
CREATE INDEX idx_carts_updated_at ON carts(updated_at);

-- Enable RLS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Create policy for all operations
CREATE POLICY "Enable all operations for authenticated users" ON carts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policy for guest carts
CREATE POLICY "Enable guest cart operations" ON carts
    FOR ALL
    TO anon
    USING (is_guest = true)
    WITH CHECK (is_guest = true);