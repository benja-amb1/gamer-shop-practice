// src/contexts/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:4000/users';

  const getSession = async () => {
    try {
      const res = await fetch(`${baseUrl}/get-session`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) setUser(data.data);
    } catch (err) {
      console.error('❌ getSession error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, getSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
