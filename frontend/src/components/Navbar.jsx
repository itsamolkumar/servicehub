import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <header className="p-4 shadow bg-white dark:bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>ServiceHub</h1>
          <button onClick={() => navigate('/search')} className="text-sm text-gray-600 hover:text-blue-600">Search</button>
        </div>
        <nav className="flex items-center gap-4">
          <button onClick={() => navigate('/services')} className="hover:text-blue-600 dark:hover:text-blue-400">Services</button>
          <button onClick={() => navigate('/about')} className="hover:text-blue-600 dark:hover:text-blue-400">About</button>
          <button onClick={() => navigate('/contact')} className="hover:text-blue-600 dark:hover:text-blue-400">Contact</button>
          <button onClick={() => navigate('/auth')} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">Login</button>
          <button
            className="p-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={() => setDark(d => !d)}
          >
            {dark ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}