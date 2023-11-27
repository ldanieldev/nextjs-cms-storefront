'use client';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import usePreviewModal from '@/hooks/use-preview-modal';
import { Product } from '@/types';
import { Expand, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

type props = {
  data: Product;
};

export default function ProductCard({ data }: props) {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const onCardClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreviewClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };
  const onAddToCartClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={onCardClick}
      className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'
    >
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt={`${data?.name} product image`}
          sizes='100vw'
          className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton
              onClick={onPreviewClick}
              icon={<Expand size={20} className='text-gray-600' />}
            />
            <IconButton
              onClick={onAddToCartClick}
              icon={<ShoppingCart size={20} className='text-gray-600' />}
            />
          </div>
        </div>
      </div>

      <div>
        <p className='font-semibold text-lg'>{data.name}</p>
        <p className='text-sm text-gray-500'>{data.category?.name}</p>
      </div>

      <div className='flex items-center justify-between'>
        <Currency price={data?.price} />
      </div>
    </div>
  );
}
