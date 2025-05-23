import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [role, setRole] = useState(null);

  const isLoggedIn = !!wallet && !!role;

  return (
    <AuthContext.Provider value={{ wallet, setWallet, role, setRole, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
