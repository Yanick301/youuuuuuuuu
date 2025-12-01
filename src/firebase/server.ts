
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FILE

// This file is the single source of truth for initializing the Firebase Admin SDK.
// It is a server-only module.
// It safely handles initialization to prevent re-initializing the app.

function getFirebaseAdminApp(): App {
  // If the app is already initialized, return it.
  if (getApps().length > 0) {
    // The 'auth' key is a convention for our primary admin app.
    // We use a named app to avoid conflicts if other libraries also initialize Firebase.
    return getApps().find(app => app.name === 'auth')!;
  }

  // If not initialized, create a new app instance.
  // We use initializeApp directly. In a real Firebase environment (like App Hosting),
  // it automatically picks up credentials. For local dev, explicitly passing
  // the projectId ensures it connects to the right database.
  const adminApp = initializeApp({
      projectId: firebaseConfig.projectId
  }, 'auth');

  return adminApp;
}

const adminApp = getFirebaseAdminApp();
const auth = getAuth(adminApp);
const firestore = getFirestore(adminApp);

export { adminApp, auth, firestore };
