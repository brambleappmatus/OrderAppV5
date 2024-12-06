-- Function to clean up old carts
CREATE OR REPLACE FUNCTION cleanup_old_carts()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete cart items for expired carts
  DELETE FROM cart
  WHERE cart_id IN (
    SELECT id
    FROM carts
    WHERE is_guest = true
    AND updated_at < NOW() - INTERVAL '30 minutes'
  );

  -- Delete expired carts
  DELETE FROM carts
  WHERE is_guest = true
  AND updated_at < NOW() - INTERVAL '30 minutes';
END;
$$;

-- Create a cron job to run cleanup every 15 minutes
SELECT cron.schedule(
  'cleanup-old-carts',
  '*/15 * * * *',
  'SELECT cleanup_old_carts();'
);