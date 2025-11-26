
'use client';

import { createContext, useContext, useState, ReactNode, useCallback }from 'react';
import { useUser } from '@/firebase';

interface AdminModeContextType {
  isAdminMode: boolean;
  activateAdminMode: (password: string) => boolean;
  deactivateAdminMode: () => void;
  isFullyAdmin: boolean;
}

const AdminModeContext = createContext<AdminModeContextType | undefined>(undefined);

const ADMIN_PASSWORD = "EZCENTIALS2025";

export function AdminModeProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { profile } = useUser();

  const activateAdminMode = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      return true;
    }
    return false;
  }, []);

  const deactivateAdminMode = useCallback(() => {
    setIsAdminMode(false);
  }, []);

  // True only if the user profile has isAdmin and the secret code has been entered
  const isFullyAdmin = !!profile?.isAdmin && isAdminMode;

  return (
    <AdminModeContext.Provider value={{ isAdminMode, activateAdminMode, deactivateAdminMode, isFullyAdmin }}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  const context = useContext(AdminModeContext);
  if (context === undefined) {
    throw new Error('useAdminMode must be used within an AdminModeProvider');
  }
  return context;
}
