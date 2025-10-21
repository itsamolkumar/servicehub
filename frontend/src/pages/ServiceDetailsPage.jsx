import { useState } from 'react';
export default function ServiceDetailsPage() {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  async function handleReview(e) {
    e.preventDefault();
    setMessage('');
    // TODO: Replace with actual serviceId and user token
    const res = await fetch('http://localhost:4000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (localStorage.getItem('token') || '') },
      body: JSON.stringify({ serviceId: 'demoServiceId', rating, text })
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.message || 'Review error');
    setMessage('Review submitted!');
    setText('');
    setRating(5);
  }
  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Service Details</h2>
      <div className="mb-4">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Service" className="w-full h-48 object-cover rounded mb-2" />
        <h3 className="font-bold text-lg mb-2">Plumber Service</h3>
        <p className="mb-2">Expert plumbing solutions for your home. Fast, reliable, and affordable.</p>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Price: ₹500</div>
        <div className="mb-2">Rating: <span className="font-semibold text-yellow-600">4.5/5</span> (23 reviews)</div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Book This Service</button>
      </div>
      <div className="mt-6">
        <h4 className="font-bold mb-2">User Reviews</h4>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-2">
          <div className="font-semibold">Amit Kumar</div>
          <div className="text-yellow-600">★★★★★</div>
          <div className="text-sm">Very good service, quick response!</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-2">
          <div className="font-semibold">Priya Singh</div>
          <div className="text-yellow-600">★★★★☆</div>
          <div className="text-sm">Affordable and professional.</div>
        </div>
        <form onSubmit={handleReview} className="mt-4 bg-gray-100 dark:bg-gray-900 rounded p-4">
          <h5 className="font-bold mb-2">Add Your Review</h5>
          {message && <div className="mb-2 text-green-600">{message}</div>}
          <div className="mb-2">
            <label className="mr-2">Rating:</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="p-1 rounded">
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write your review..." className="w-full p-2 border rounded mb-2" required />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit Review</button>
        </form>
      </div>
    </div>
  );
}
