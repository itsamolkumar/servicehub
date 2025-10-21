import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import FAQs from './pages/FAQs';
import HelpCenter from './pages/HelpCenter';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />
      {/* Outlet will render the active child route */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}