import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyCategories = [
  { title: "Cleaning", img: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg", desc: "Home & office cleaning" },
  { title: "Plumbing", img: "https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg", desc: "Faucet & leak repair" },
  { title: "Electrician", img: "https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg", desc: "Wiring & appliance" },
  { title: "Salon", img: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg", desc: "Beauty & grooming" },
  { title: "Tutoring", img: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg", desc: "Academic learning" },
  { title: "Carpentry", img: "https://images.pexels.com/photos/3637786/pexels-photo-3637786.jpeg", desc: "Wood work" }
];

const dummyServices = [
  { title: "Deluxe House Cleaning", img: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg", desc: "Sparkle up your home!", price: 349, rating: 4.9 },
  { title: "24x7 Tap Fix", img: "https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg", desc: "Say no to leaks.", price: 249, rating: 4.8 },
  { title: "Instant AC Repair", img: "https://images.pexels.com/photos/4108271/pexels-photo-4108271.jpeg", desc: "Chill guaranteed!", price: 499, rating: 5.0 }
];

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative h-[450px] flex items-center justify-center text-center bg-cover bg-center" 
               style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg')` }}>
        <div className="relative z-10 max-w-3xl text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">Find Local Services Near You</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">Trusted, affordable and nearby services at your fingertips</p>
          <div className="flex justify-center">
            <input 
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-5 py-3 rounded-l-full focus:outline-none text-gray-900 shadow-md"
            />
            <button 
              onClick={() => navigate('/search', { state: { query: search } })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-r-full font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {dummyCategories.map((category, idx) => (
            <div key={idx} 
                 onClick={() => navigate('/services', { state: { category: category.title } })}
                 className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
              <img src={category.img} alt={category.title} className="rounded mb-2 w-full h-24 object-cover" />
              <h3 className="font-bold">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">Top Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyServices.map((service, idx) => (
            <div key={idx} 
                 onClick={() => navigate('/service/' + service.title.toLowerCase().replace(/ /g, '-'))}
                 className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
              <img src={service.img} alt={service.title} className="rounded mb-2 w-full h-48 object-cover" />
              <h3 className="font-bold mt-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
              <div className="text-sm text-gray-500 mt-2 flex items-center">
                <span className="font-semibold text-green-600">₹{service.price}</span>
                <span className="mx-2">|</span>
                <span className="text-yellow-500">⭐ {service.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 text-center mt-24">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8">Join thousands finding their perfect local partner — it's free.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button onClick={() => navigate('/register')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform">
            Find Services
          </button>
          <button onClick={() => navigate('/register?type=provider')} className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-transform">
            Become a Provider
          </button>
        </div>
      </section>
    </main>
  );
}