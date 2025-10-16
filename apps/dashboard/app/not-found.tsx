import { buttonVariants } from '@byte24/ui/components/button';
import { cn } from '@byte24/ui/utils';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='flex h-screen items-center justify-center overflow-hidden bg-primary'>
      <div className='container mx-auto px-4'>
        <h1 className='mb-10 text-center font-bold font-heading text-4xl text-white lg:text-5xl'>
          Oops. Pagina niet gevonden.
        </h1>
        <div className='mb-20 flex justify-center'>
          <Link
            href='/'
            className={cn(
              buttonVariants({
                variant: 'outline',
              })
            )}
          >
            Terug naar home
          </Link>
        </div>
        <div className='flex items-center justify-center gap-4 sm:gap-8 lg:gap-16'>
          <div>
            <div className='mx-auto h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            <div className='mb-2 flex justify-between'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
            <div className='mb-2 flex gap-1 lg:gap-2'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
            <div className='ml-auto h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
          </div>
          <div>
            <div className='mb-2 flex gap-1 lg:gap-2'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
            <div className='mb-2 flex justify-between'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
            <div className='flex gap-1 lg:gap-2'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
          </div>
          <div>
            <div className='mx-auto h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            <div className='mb-2 flex justify-between'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
            <div className='mb-2 flex gap-1 lg:gap-2'>
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
              <div className='h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
            </div>
            <div className='ml-auto h-6 w-6 rounded-lg bg-white bg-opacity-20 sm:h-12 sm:w-12 sm:rounded-3xl lg:h-24 lg:w-24' />
          </div>
        </div>
      </div>
    </section>
  );
}
