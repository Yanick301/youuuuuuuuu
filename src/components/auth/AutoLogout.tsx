'use client';

import { useAuth, useUser } from '@/firebase';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';

export function AutoLogout() {
  const auth = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user && auth) {
      signOut(auth);
    }
  }, [user, auth]);

  return null;
}
