import { Product } from '@/types';
import { revalidatePath } from 'next/cache';

const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${url}/${id}`);
  revalidatePath('/');

  return res.json();
}
