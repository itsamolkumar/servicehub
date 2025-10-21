import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About ServiceHub</h1>
      <div className="space-y-6">
        <p className="text-lg">
          ServiceHub is your trusted platform for finding and booking local services. We connect skilled professionals 
          with customers looking for quality service providers in their area.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
        <p className="text-lg">
          To create a seamless connection between service providers and customers, ensuring quality, reliability, 
          and transparency in every interaction.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg dark:text-gray-100">
            <h3 className="font-semibold text-xl mb-2">Verified Providers</h3>
            <p>All our service providers undergo thorough verification and quality checks.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg dark:text-gray-100">
            <h3 className="font-semibold text-xl mb-2">Secure Booking</h3>
            <p>Book services with confidence using our secure platform.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg dark:text-gray-100">
            <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
            <p>Our customer support team is always here to help you.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}