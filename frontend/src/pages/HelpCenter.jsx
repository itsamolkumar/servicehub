import { useNavigate } from 'react-router-dom';

export default function HelpCenter() {
  const navigate = useNavigate();
  
  const helpTopics = [
    {
      title: "Getting Started",
      icon: "🚀",
      items: ["Create an account", "Browse services", "Book your first service"]
    },
    {
      title: "Booking & Payment",
      icon: "💳",
      items: ["Booking process", "Payment methods", "Cancellation policy"]
    },
    {
      title: "Service Related",
      icon: "🛠️",
      items: ["Service guarantees", "Quality standards", "Provider verification"]
    },
    {
      title: "Account & Security",
      icon: "🔒",
      items: ["Account settings", "Password reset", "Privacy settings"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <button 
          onClick={() => navigate('/contact')}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Contact Support
        </button>
      </div>

      {/* Search */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search help articles..."
              className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpTopics.map((topic, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 dark:text-gray-100">
            <div className="text-4xl mb-4">{topic.icon}</div>
            <h3 className="text-xl font-semibold mb-4">{topic.title}</h3>
            <ul className="space-y-2">
              {topic.items.map((item, idx) => (
                <li 
                  key={idx}
                  onClick={() => navigate('/help/article/' + item.toLowerCase().replace(/ /g, '-'))}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => navigate('/faqs')}
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            FAQs
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Contact Us
          </button>
          <button 
            onClick={() => navigate('/feedback')}
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}