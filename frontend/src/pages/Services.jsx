import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Services() {
  const navigate = useNavigate();
  const [services] = useState([
    {
      id: 1,
      title: 'Home Cleaning',
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
      price: '₹299/visit',
      rating: 4.8,
      bookings: 120
    },
    {
      id: 2,
      title: 'Plumbing Services',
      image: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg',
      price: '₹399/visit',
      rating: 4.9,
      bookings: 200
    },
    {
      id: 3,
      title: 'Electrical Repair',
      image: 'https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg',
      price: '₹499/visit',
      rating: 4.7,
      bookings: 150
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <button 
          onClick={() => navigate('/search')}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Search Services
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(service => (
          <div 
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-2xl transition-shadow"
            onClick={() => navigate(`/service/${service.id}`)}
          >
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 dark:text-gray-100">{service.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-semibold">{service.price}</span>
                <span className="text-yellow-500">⭐ {service.rating}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{service.bookings} successful bookings</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/book/${service.id}`);
                }}
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}