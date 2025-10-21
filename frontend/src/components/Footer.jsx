import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 cursor-pointer" onClick={() => navigate('/')}>ServiceHub</h3>
            <p className="text-gray-400 mb-4">Your trusted platform for local services. Quality work, vetted professionals, and seamless booking experience.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Our Services</Link></li>
              <li><Link to="/providers" className="text-gray-400 hover:text-white">Service Providers</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link to="/feedback" className="text-gray-400 hover:text-white">Feedback</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Service Street, City - 400001</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ support@servicehub.com</li>
              <li>⏰ Mon-Sat: 9:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ServiceHub. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}