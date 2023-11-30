import { Category } from '@/types';
import { revalidatePath } from 'next/cache';

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`${url}/${id}`);
  revalidatePath('/');

  return res.json();
}
