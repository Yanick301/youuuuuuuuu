
'use client';

import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { doc, onSnapshot } from 'firebase/firestore';

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
};

export type WithId<T> = T & { id: string };

export interface UserHookResult {
  user: User | null;
  profile: WithId<UserProfile> | null;
  isUserLoading: boolean;
  error: Error | null;
}

export const useUser = (): UserHookResult => {
  const { auth, firestore, isUserLoading: isAuthLoading } = useFirebase();
  const user = auth.currentUser;

  const [profile, setProfile] = useState<WithId<UserProfile> | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If auth is still loading, or if there is no user, we don't fetch a profile.
    if (isAuthLoading || !user || !firestore) {
      setProfile(null);
      // We are only done loading the profile if auth is also done loading.
      setIsProfileLoading(!isAuthLoading);
      return;
    }

    setIsProfileLoading(true);
    const userProfileRef = doc(firestore, 'userProfiles', user.uid);
    
    const unsubscribeProfile = onSnapshot(userProfileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile({ id: docSnap.id, ...(docSnap.data() as UserProfile) });
      } else {
        // User is authenticated, but no profile document exists.
        console.warn(`No profile document found for user ${user.uid}`);
        setProfile(null);
      }
      setIsProfileLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching user profile:", err);
      setError(err);
      setProfile(null);
      setIsProfileLoading(false);
    });

    return () => unsubscribeProfile();
  }, [user, firestore, isAuthLoading]);


  // The final loading state is true if either auth or the profile is still loading.
  return { user, profile, isUserLoading: isAuthLoading || isProfileLoading, error };
};
