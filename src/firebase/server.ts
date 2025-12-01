
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FILE

// This file is the single source of truth for initializing the Firebase Admin SDK.
// It is marked with 'use server' to ensure it only runs on the server.
// It safely handles initialization to prevent re-initializing the app.

function getFirebaseAdminApp(): App {
  // If the app is already initialized, return it.
  if (getApps().length > 0) {
    // The 'auth' key is a convention for our primary admin app.
    // We use a named app to avoid conflicts if other libraries also initialize Firebase.
    return getApps().find(app => app.name === 'auth')!;
  }

  // If not initialized, create a new app instance.
  // We use initializeApp directly, which automatically picks up
  // GOOGLE_APPLICATION_CREDENTIALS environment variable on App Hosting.
  const adminApp = initializeApp({
      projectId: firebaseConfig.projectId
  }, 'auth');

  return adminApp;
}

const adminApp = getFirebaseAdminApp();
const auth = getAuth(adminApp);
const firestore = getFirestore(adminApp);

export { adminApp, auth, firestore };
