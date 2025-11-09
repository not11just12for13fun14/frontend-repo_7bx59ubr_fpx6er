import { Phone } from 'lucide-react';

export default function Navbar() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-rose-600 text-white grid place-items-center font-bold">BW</div>
          <div>
            <p className="font-bold text-gray-900 leading-none">Book My Wallpaper</p>
            <p className="text-xs text-gray-500 leading-none">Hyderabad</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <button onClick={() => go('gallery')} className="hover:text-rose-600">Catalogue</button>
          <button onClick={() => go('quote')} className="hover:text-rose-600">Instant Quote</button>
          <button onClick={() => go('booking')} className="hover:text-rose-600">Book Visit</button>
        </nav>
        <a href="tel:+919999999999" className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-white font-semibold hover:bg-rose-700">
          <Phone className="h-4 w-4"/> Call Now
        </a>
      </div>
    </header>
  );
}
