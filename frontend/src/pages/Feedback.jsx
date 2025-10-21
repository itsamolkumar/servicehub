import { useNavigate } from 'react-router-dom';

export default function Feedback() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement feedback submission
    setTimeout(() => {
      alert('Thank you for your feedback!');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Share Your Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-8 dark:text-gray-100">
        <div>
          <label className="block font-medium mb-2">Type of Feedback</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100">
            <option>General Feedback</option>
            <option>Bug Report</option>
            <option>Feature Request</option>
            <option>Service Quality</option>
            <option>Provider Feedback</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Your Experience Rating</label>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                className="text-2xl hover:scale-110 transition-transform"
              >
                50
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Your Feedback</label>
          <textarea
            rows="5"
            placeholder="Tell us about your experience..."
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-2">Suggestions for Improvement</label>
          <textarea
            rows="3"
            placeholder="How can we make your experience better?"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
          ></textarea>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </form>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Need immediate assistance?</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Contact Support
          </button>
          <button
            onClick={() => navigate('/faqs')}
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            View FAQs
          </button>
        </div>
      </div>
    </div>
  );
}