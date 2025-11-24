// IMPORTANT: Do not modify this file. It is a an auto-generated file that is part of the
// app's Firebase scaffolding. It is intended to be modified by the Studio AI agent.
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // In a development environment, we always initialize with the config object.
    // In a production environment (like Firebase App Hosting), initializeApp()
    // can be called without arguments to automatically use the hosting environment's config.
    // However, for simplicity and robustness across all environments, we will consistently use the local config.
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
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './auth/use-user';
export * from './errors';
export * from './error-emitter';
