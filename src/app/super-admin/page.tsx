'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuperAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fbfd' }}>
      <div style={{ textAlign: 'center', color: '#64748b' }}>
        <p>Redirecting to Workshop Admin Dashboard...</p>
      </div>
    </div>
  );
}
