import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import FAQs from './pages/FAQs';
import HelpCenter from './pages/HelpCenter';
import Feedback from './pages/Feedback';
import Home from './pages/Home';
import BookingHistoryPage from './pages/BookingHistoryPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import ProtectedRoute from './ProtectedRoute';



function ProviderDashboard() {
  const { token } = useUser();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/bookings/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBookings(data.bookings || []));
  }, [token]);

  async function handleDecide(id, action) {
    setMessage('');
    const res = await fetch(`http://localhost:4000/bookings/${id}/decide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action })
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.message || 'Error');
    setMessage('Booking updated!');
  }

  const earnings = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Provider Dashboard</h2>
      <div className="mb-2">Earnings (dummy): ₹{earnings}</div>
      {message && <div className="mb-2 text-green-600">{message}</div>}
      <form className="mb-6" onSubmit={async e => {
        e.preventDefault();
        const file = e.target.file.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('http://localhost:4000/upload/image', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        const data = await res.json();
        if (data.url) setMessage('Image uploaded!');
        else setMessage('Upload error');
      }}>
        <label className="block mb-2 font-semibold">Upload Service Image:</label>
        <input type="file" name="file" accept="image/*" className="mb-2" />
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Upload</button>
      </form>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th>Service</th><th>User</th><th>Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id} className="border-b">
              <td>{b.service?.title}</td>
              <td>{b.user?.name}</td>
              <td>{b.preferredDate?.slice(0,10)}</td>
              <td>{b.status}</td>
              <td>
                {b.status === 'pending' && (
                  <>
                    <button className="px-2 py-1 bg-green-500 text-white rounded mr-1" onClick={() => handleDecide(b._id, 'accept')}>Accept</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDecide(b._id, 'reject')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useUser } from './UserContext';
import { useEffect, useState } from 'react';

function AdminPanel() {
  const { token } = useUser();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
    fetch('http://localhost:4000/bookings/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBookings(data.bookings || []));
    fetch('http://localhost:4000/reviews', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setReviews(data.reviews || []));
  }, [token]);

  async function handleApprove(id) {
    setMessage('');
    const res = await fetch(`http://localhost:4000/admin/providers/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.message || 'Error');
    setMessage('Provider approved!');
  }
  async function handleDeleteUser(id) {
    setMessage('');
    const res = await fetch(`http://localhost:4000/admin/users/${id}/delete`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return setMessage('Delete error');
    setMessage('User deleted!');
  }
  async function handleDeleteReview(id) {
    setMessage('');
    const res = await fetch(`http://localhost:4000/reviews/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return setMessage('Delete error');
    setMessage('Review deleted!');
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      {message && <div className="mb-2 text-green-600">{message}</div>}
      <h3 className="font-semibold mb-2">Users & Providers</h3>
      <table className="w-full text-sm border mb-6">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th>Name</th><th>Email</th><th>Role</th><th>Approved</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isApproved ? 'Yes' : 'No'}</td>
              <td>
                {u.role === 'provider' && !u.isApproved && (
                  <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => handleApprove(u._id)}>Approve</button>
                )}
                <button className="px-2 py-1 bg-red-500 text-white rounded ml-1" onClick={() => handleDeleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="font-semibold mb-2">Bookings</h3>
      <table className="w-full text-sm border mb-6">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th>Service</th><th>User</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id} className="border-b">
              <td>{b.service?.title}</td>
              <td>{b.user?.name}</td>
              <td>{b.preferredDate?.slice(0,10)}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="font-semibold mb-2">Reviews</h3>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th>Service</th><th>User</th><th>Rating</th><th>Text</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(r => (
            <tr key={r._id} className="border-b">
              <td>{r.service}</td>
              <td>{r.user}</td>
              <td>{r.rating}</td>
              <td>{r.text}</td>
              <td>
                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDeleteReview(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'services', element: <Services /> },
      { path: 'providers', element: <div className="p-8">Providers Page (TODO)</div> },
      { path: 'pricing', element: <div className="p-8">Pricing Page (TODO)</div> },
      { path: 'help', element: <HelpCenter /> },
      { path: 'faqs', element: <FAQs /> },
      { path: 'feedback', element: <Feedback /> },
      { path: 'privacy', element: <div className="p-8">Privacy Policy (TODO)</div> },
      { path: 'terms', element: <div className="p-8">Terms of Service (TODO)</div> },
      { path: 'cookies', element: <div className="p-8">Cookie Policy (TODO)</div> },
      { path: 'register', element: <div className="p-8">Register Page (TODO)</div> },
      { path: 'login', element: <div className="p-8">Login Page (TODO)</div> },
      { path: 'auth', element: <AuthPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'service/:id', element: <ServiceDetailsPage /> },
      { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: 'book', element: <ProtectedRoute><BookingPage /></ProtectedRoute> },
      { path: 'history', element: <ProtectedRoute><BookingHistoryPage /></ProtectedRoute> },
      { path: 'provider', element: <ProtectedRoute role="provider"><ProviderDashboard /></ProtectedRoute> },
      { path: 'admin', element: <ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute> },
      { path: '*', element: (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        </div>
      ) },
    ]

  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
