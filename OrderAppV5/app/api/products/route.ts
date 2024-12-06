import { NextResponse } from 'next/server';
import { createProduct, updateProduct, deleteProduct } from '@/lib/products';
import { Product } from '@/types/product';

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const result = await createProduct(product);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const product: Product = await request.json();
    await updateProduct(product);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}