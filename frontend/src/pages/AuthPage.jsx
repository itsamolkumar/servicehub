import { useState, useEffect } from 'react';
import { useUser } from '../UserContext';

const API = 'http://localhost:4000';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login | signup | verify | reset
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'user', otp: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, token, setToken, logout } = useUser();

  // Handle input change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Signup
  async function handleSignup(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      // Request OTP for verify
      const res = await fetch(`${API}/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, purpose: 'verify' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      setMode('verify');
      setMessage('OTP sent to your email. Enter OTP to verify and complete signup.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Verify OTP and create user
  async function handleVerify(e) {
    e.preventDefault();
    setMessage('');
    // Verify OTP
    const res = await fetch(`${API}/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, code: form.otp, purpose: 'verify' })
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.message || 'OTP error');
    // Create user
    const res2 = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role })
    });
    const data2 = await res2.json();
    if (!res2.ok) return setMessage(data2.message || 'Signup error');
    setToken(data2.token);
    setMessage('Signup successful! You are logged in.');
    setMode('login');
  }

  // Login
  async function handleLogin(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setToken(data.token);
      setMessage('Login successful!');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Request OTP for password reset
  async function handleRequestReset(e) {
    e.preventDefault();
    setMessage('');
    await fetch(`${API}/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, purpose: 'reset' })
    });
    setMode('reset');
    setMessage('OTP sent to your email. Enter OTP and new password.');
  }

  // Reset password
  async function handleReset(e) {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API}/otp/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, code: form.otp, newPassword: form.newPassword })
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.message || 'Reset error');
    setMessage('Password reset successful! You can now login.');
    setMode('login');
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Profile</h2>
        <div className="mb-4 text-gray-600 dark:text-gray-300">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
        <button 
          onClick={logout}
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : mode === 'verify' ? 'Verify Email' : 'Reset Password'}</h2>
      {message && <div className="mb-2 text-blue-600 dark:text-blue-400">{message}</div>}
      {mode === 'signup' && (
        <form onSubmit={handleSignup} className="space-y-3">
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>
          <button 
            type="submit" 
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <button 
            type="button" 
            className="w-full p-2 mt-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" 
            onClick={() => setMode('login')}
            disabled={loading}
          >
            Already have an account? Login
          </button>
        </form>
      )}
      {mode === 'verify' && (
        <form onSubmit={handleVerify} className="space-y-3">
          <input name="otp" type="text" placeholder="Enter OTP" value={form.otp} onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">Verify & Complete Signup</button>
        </form>
      )}
      {mode === 'login' && (
        <form onSubmit={handleLogin} className="space-y-3">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" required />
          <button 
            type="submit" 
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button 
            type="button" 
            className="w-full p-2 mt-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" 
            onClick={() => setMode('signup')}
            disabled={loading}
          >
            New user? Sign Up
          </button>
          <button 
            type="button" 
            className="w-full p-2 mt-2 bg-yellow-100 dark:bg-yellow-800 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors text-yellow-800 dark:text-yellow-100" 
            onClick={() => setMode('requestReset')}
            disabled={loading}
          >
            Forgot password?
          </button>
        </form>
      )}
      {mode === 'requestReset' && (
        <form onSubmit={handleRequestReset} className="space-y-3">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full p-2 bg-yellow-600 text-white rounded">Send OTP</button>
        </form>
      )}
      {mode === 'reset' && (
        <form onSubmit={handleReset} className="space-y-3">
          <input name="otp" type="text" placeholder="Enter OTP" value={form.otp} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="newPassword" type="password" placeholder="New Password" value={form.newPassword} onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">Reset Password</button>
        </form>
      )}
    </div>
  );
}
