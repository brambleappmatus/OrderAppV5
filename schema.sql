-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for all operations
CREATE POLICY "Enable all operations for authenticated users" ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to decrement display order
CREATE OR REPLACE FUNCTION decrement_order()
RETURNS integer
LANGUAGE SQL
AS $$
  SELECT display_order - 1;
$$;

-- Add trigger to auto-generate display_order
CREATE OR REPLACE FUNCTION set_display_order()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.display_order IS NULL THEN
    NEW.display_order := (
      SELECT COALESCE(MAX(display_order), 0) + 1
      FROM products
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_display_order
  BEFORE INSERT ON products
  FOR EACH ROW
  EXECUTE FUNCTION set_display_order();

-- Add unique constraint on display_order
ALTER TABLE products
  ADD CONSTRAINT unique_display_order UNIQUE (display_order);

-- Add index on display_order
CREATE INDEX idx_products_display_order ON products(display_order);