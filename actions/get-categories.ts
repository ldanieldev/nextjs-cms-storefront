import { Category } from '@/types';
import { revalidatePath } from 'next/cache';

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategories(): Promise<Category[]> {
  const res = await fetch(url);

  revalidatePath('/');

  return res.json();
}
