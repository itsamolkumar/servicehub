import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetch('http://localhost:4000/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch(() => setUser(null));
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  function logout() {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
