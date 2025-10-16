'use client';

import { Button } from '@byte24/ui';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const HistoryBackButton = () => {
  const router = useRouter();
  const onBack = () => {
    if (window.history.length <= 1) {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <Button variant='ghost' size='fit' className='hidden px-2 py-1 md:block' onClick={onBack}>
      <MoveLeft />
    </Button>
  );
};
