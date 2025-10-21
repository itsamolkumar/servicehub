import { useNavigate } from 'react-router-dom';

export default function FAQs() {
  const navigate = useNavigate();
  const faqs = [
    {
      q: "How do I book a service?",
      a: "Simply browse our services, select the one you need, choose your preferred date and time, and confirm your booking. You'll receive an instant confirmation."
    },
    {
      q: "What is the cancellation policy?",
      a: "You can cancel your booking up to 4 hours before the scheduled time for free. Later cancellations may incur a small fee."
    },
    {
      q: "How are service providers verified?",
      a: "All our service providers undergo thorough background checks, document verification, and skill assessment before being listed on our platform."
    },
    {
      q: "Is there a satisfaction guarantee?",
      a: "Yes! If you're not satisfied with the service, you can raise a complaint within 24 hours and we'll either arrange a re-service or refund."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <button 
          onClick={() => navigate('/contact')}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Need More Help?
        </button>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 dark:text-gray-100">
            <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
            <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/contact')}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Contact Support
          </button>
          <button 
            onClick={() => navigate('/help')}
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
          >
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
}