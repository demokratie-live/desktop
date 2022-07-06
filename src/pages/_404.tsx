import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Empty from '@/components/molecules/Empty';

export default function FourOhFour() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  });

  return <Empty />;
}
