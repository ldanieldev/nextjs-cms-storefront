'use client';

import { RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { toast } from 'sonner';

export default function Summary() {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: 'POST',
          body: JSON.stringify({
            productIds: items.map((item) => item.id)
          })
        }
      );

      const data = await response.json();
      router.push(data?.url);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.log('[CHECKOUT_ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Order total</div>
          <Currency price={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className='w-full mt-6'
      >
        {loading ? (
          <div className='flex justify-center cursor-wait space-x-2'>
            <RefreshCw className='w-6 h-6 animate-spin' />
            <p>Loading....</p>
          </div>
        ) : (
          'Checkout'
        )}
      </Button>
    </div>
  );
}
