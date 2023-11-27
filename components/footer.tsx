export default function Footer() {
  return (
    <footer className='bg-white border-t'>
      <div className='mx-auto py-10'>
        <p className='text-center text-xs text-black'>
          &copy; {new Date().getFullYear()} &nbsp;
          <a
            target='_blank'
            className='hover:underline'
            href='https://ldanieldev.com'
          >
            LDanielDev
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
