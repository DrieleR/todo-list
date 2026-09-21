import { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('todo_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('todo_user');
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (tok, usr) => {
    localStorage.setItem('todo_token', tok);
    localStorage.setItem('todo_user', JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
  };

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    persist(data.token, data.user);
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await authApi.register(name, email, password);
    persist(data.token, data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('todo_token');
    localStorage.removeItem('todo_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
