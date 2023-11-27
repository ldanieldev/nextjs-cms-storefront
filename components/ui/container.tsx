type props = {
  children: React.ReactNode;
};

export default function Container({ children }: props) {
  return <div className='mx-auto max-w-7xl'>{children}</div>;
}
