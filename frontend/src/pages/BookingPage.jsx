import { useState } from 'react';
import { useUser } from '../UserContext';

export default function BookingPage() {
  const { user, token } = useUser();
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

    const [done, setDone] = useState(false);
    async function handleBook(e) {
      e.preventDefault();
      setMessage("");
      // TODO: Replace with actual booking API and user token
      setTimeout(() => {
        setDone(true);
        setMessage("Booking confirmed! Confirmation email sent.");
      }, 1200);
    }

  if (!user) return <div className="p-8">Please login to book a service.</div>;
  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Book a Service</h2>
      {message && <div className="mb-2 text-green-600 dark:text-green-400">{message}</div>}
        {done ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">✅</div>
            <div className="font-bold text-lg">Your booking is confirmed!</div>
            <div className="text-sm mt-2">A confirmation email has been sent to your registered email address.</div>
          </div>
        ) : (
      <form onSubmit={handleBook} className="space-y-3">
        <input name="serviceId" type="text" placeholder="Service ID" value={serviceId} onChange={e => setServiceId(e.target.value)} className="w-full p-2 border rounded" required />
        <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" required />
        <input name="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Book Service</button>
      </form>
        )}
    </div>
  );
}
