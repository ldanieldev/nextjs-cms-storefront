import { Billboard } from '@/types';
import { revalidatePath } from 'next/cache';

const url = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export default async function getBillboard(id: string): Promise<Billboard> {
  const res = await fetch(`${url}/${id}`);
  revalidatePath('/');

  return res.json();
}
