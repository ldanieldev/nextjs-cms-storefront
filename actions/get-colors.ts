import { Color } from '@/types';
import { revalidatePath } from 'next/cache';

const url = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export default async function getSizes(): Promise<Color[]> {
  const res = await fetch(url);

  revalidatePath('/');

  return res.json();
}
