import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/product-list';
import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import { revalidatePath } from 'next/cache';

const HomePage = async () => {
  revalidatePath('/product/[productId]');

  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard('c2e7c027-2228-4605-8a6c-3ac475898593');

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title='Featured Products' items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
