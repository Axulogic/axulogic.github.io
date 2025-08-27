'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview, event } from '@/lib/gtm';

export function useGTM() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return {
    event,
  };
}
