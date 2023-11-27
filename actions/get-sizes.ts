import { Size } from '@/types';
import { revalidatePath } from 'next/cache';

const url = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export default async function getSizes(): Promise<Size[]> {
  const res = await fetch(url);

  revalidatePath(url);

  return res.json();
}
