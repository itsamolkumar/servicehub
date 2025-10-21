import { useEffect, useState } from 'react';
import { useUser } from '../UserContext';

export default function BookingHistoryPage() {
  const { token } = useUser();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/bookings/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBookings(data.bookings || []));
  }, [token]);
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Booking History</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th>Service</th><th>Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id} className="border-b">
              <td>{b.service?.title}</td>
              <td>{b.preferredDate?.slice(0,10)}</td>
              <td>{b.status}</td>
              <td>
                {b.status === 'pending' && (
                  <form method="post" onSubmit={async e => {
                    e.preventDefault();
                    await fetch(`http://localhost:4000/bookings/${b._id}/cancel`, {
                      method: 'POST',
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    window.location.reload();
                  }}>
                    <button className="px-2 py-1 bg-red-500 text-white rounded">Cancel</button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
