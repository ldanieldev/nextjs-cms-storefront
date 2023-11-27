import { Product } from '@/types';
import { revalidatePath } from 'next/cache';
import qs from 'query-string';

type Query = {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
};

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function getProducts(query: Query): Promise<Product[]> {
  const url = qs.stringifyUrl({
    url: apiUrl,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured
    }
  });

  const res = await fetch(url);
  revalidatePath(url);

  return res.json();
}
