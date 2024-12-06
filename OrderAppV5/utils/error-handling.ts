export function handleDatabaseError(error: any): string {
  if (error?.code === '23505') {
    return 'A product with this ID already exists.';
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
}

export function isValidProduct(product: any): boolean {
  return (
    product &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.description === 'string'
  );
}