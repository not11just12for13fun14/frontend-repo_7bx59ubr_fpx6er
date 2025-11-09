import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import QuoteCalculator from './components/QuoteCalculator';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="font-inter text-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <Gallery />
        <QuoteCalculator />
        <BookingForm />
        <Footer />
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Book My Wallpaper • Hyderabad</p>
        <div className="text-sm text-gray-600">WhatsApp: +91 99999 99999 • Email: hello@bookmywallpaper.in</div>
      </div>
    </footer>
  );
}

export default App;
