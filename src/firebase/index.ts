
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length === 0) {
    // Always initialize with the config object.
    // This is safe for all environments, including Firebase App Hosting.
    // App Hosting will override these values with environment variables if present.
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}

// Explicitly export from each module to avoid conflicts
export {
  FirebaseProvider,
  useFirebase,
  useAuth,
  useFirestore,
  useStorage,
  useFirebaseApp,
  useMemoFirebase,
  type FirebaseContextState,
  type FirebaseServicesAndUser
} from './provider';

export { FirebaseClientProvider } from './client-provider';
export { useCollection, type UseCollectionResult, type WithId as WithCollectionId } from './firestore/use-collection';
export { useDoc, type UseDocResult, type WithId as WithDocId } from './firestore/use-doc';
export { useUser, type UserProfile, type WithId as WithUserId, type UserHookResult } from './auth/use-user';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export { FirestorePermissionError } from './errors';
export { errorEmitter, type AppEvents } from './error-emitter';
