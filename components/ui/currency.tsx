'use client';
import { priceFormatter } from '@/lib/utils';
import { useEffect, useState } from 'react';

type props = {
  price?: string | number;
};

export default function Currency({ price }: props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='font-semibold'>{priceFormatter.format(Number(price))}</div>
  );
}
