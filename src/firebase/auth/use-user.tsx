'use client';

import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

export interface UserHookResult {
  user: User | null;
  isAdmin: boolean;
  isUserLoading: boolean;
  userError: Error | null;
}

export const useUser = (): UserHookResult => {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      setIsUserLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setIsUserLoading(false);
      },
      (error) => {
        setUserError(error);
        setIsUserLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);
      
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists() && doc.data().isAdmin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }, (error) => {
        console.error("Error fetching user admin status:", error);
        setIsAdmin(false);
      });

      return () => unsubscribe();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return { user, isAdmin, isUserLoading, userError };
};
