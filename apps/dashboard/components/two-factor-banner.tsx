'use client';

import { Alert, AlertDescription, AlertTitle } from '@byte24/ui/components/alert';
import { Button } from '@byte24/ui/components/button';
import { authClient } from '@dashboard/common/auth-client';
import { Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

const { useSession } = authClient;

export function TwoFactorBanner() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user?.twoFactorEnabled) {
    return null;
  }

  return (
    <Alert className='mb-4'>
      <Shield className='h-4 w-4' />
      <AlertTitle>Tweestapsverificatie niet ingeschakeld</AlertTitle>
      <AlertDescription className='flex items-center justify-between'>
        <span>
          Je account is niet optimaal beveiligd. Schakel tweestapsverificatie in voor extra
          beveiliging.
        </span>
        <Button variant='outline' size='sm' onClick={() => router.push('/settings')}>
          Instellen
        </Button>
      </AlertDescription>
    </Alert>
  );
}
