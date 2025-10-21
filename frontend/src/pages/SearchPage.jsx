import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API = 'http://localhost:4000';
const demoSuggestions = ["Plumber Service", "Electrician Service", "Home Cleaning", "AC Repair", "Carpenter", "Painter", "Gardener", "Laundry", "Pest Control"];

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    q: new URLSearchParams(location.search).get('q') || '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  // Load services with filters
  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.q) params.append('q', filters.q);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const res = await fetch(`${API}/services?${params}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load services');
        setServices(data.services);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [filters]);

  // Handle search/filter changes
  function handleFilterChange(e) {
    const { name, value } = e.target;
    if (name === 'q') {
      setSuggestions(value.length > 0 ? demoSuggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      ) : []);
    }
    setFilters(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filters */}
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Search & Discover Services</h2>
        <div className="flex flex-wrap gap-4 relative">
          <div className="flex-1">
            <input
              type="text"
              name="q"
              placeholder="Search services..."
              value={filters.q}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white dark:bg-gray-800 border rounded shadow mt-1 z-10">
                {suggestions.map(s => (
                  <li 
                    key={s} 
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900" 
                    onClick={() => { 
                      setFilters(prev => ({ ...prev, q: s }));
                      setSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Categories</option>
            <option value="cleaning">Cleaning</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="tutoring">Tutoring</option>
            <option value="moving">Moving</option>
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Results */}
      {error ? (
        <div className="text-red-600 dark:text-red-400 text-center p-4">{error}</div>
      ) : loading ? (
        <div className="text-center p-8">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center p-8">No services found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div 
              key={service._id}
              onClick={() => navigate(`/service/${service._id}`)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              {service.images?.[0] && (
                <img 
                  src={service.images[0]} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 dark:text-gray-100">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 dark:text-green-400 font-semibold">₹{service.price}</span>
                  {service.ratingAvg > 0 && (
                    <span className="text-yellow-500">⭐ {service.ratingAvg.toFixed(1)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
