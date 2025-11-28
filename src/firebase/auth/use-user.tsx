
'use client';

import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { doc, onSnapshot } from 'firebase/firestore';

export type UserProfile = {
  isAdmin?: boolean;
  photoURL?: string;
  // other profile fields...
};

export type WithId<T> = T & { id: string };

export interface UserHookResult {
  user: User | null;
  profile: WithId<UserProfile> | null;
  isUserLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
}

export const useUser = (): UserHookResult => {
  const { auth, firestore, isUserLoading: isAuthLoading } = useFirebase();

  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [profile, setProfile] = useState<WithId<UserProfile> | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      setIsProfileLoading(false);
      return;
    }

    const unsubscribeAuth = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        if (!user) {
          // If user logs out, clear profile and stop loading
          setProfile(null);
          setIsProfileLoading(false);
        }
      },
      (error) => {
        setError(error);
        setUser(null);
        setProfile(null);
        setIsProfileLoading(false);
      }
    );

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    // Don't do anything until we have a user object
    if (!user || !firestore) {
      if (!isAuthLoading) { // Only stop loading if auth check is also complete
        setIsProfileLoading(false);
      }
      setProfile(null); // Clear profile if no user
      return;
    }

    // We have a user, start loading profile
    setIsProfileLoading(true);
    const userProfileRef = doc(firestore, 'userProfiles', user.uid);
    
    const unsubscribeProfile = onSnapshot(userProfileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile({ id: docSnap.id, ...(docSnap.data() as UserProfile) });
      } else {
        setProfile(null);
      }
      // Profile is loaded (or confirmed not to exist), so we are done loading
      setIsProfileLoading(false);
      setError(null);
    }, (err) => {
      setError(err);
      setProfile(null);
      setIsProfileLoading(false);
    });

    return () => unsubscribeProfile();
  }, [user, firestore, isAuthLoading]);

  const isAdmin = profile?.isAdmin === true;

  return { user, profile, isUserLoading: isAuthLoading || isProfileLoading, error, isAdmin };
};
