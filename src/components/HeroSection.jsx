import { Phone, ArrowRight, Star, Calendar } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose-300 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-300 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-28 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-rose-600 text-xs font-semibold ring-1 ring-rose-200">
              <Star className="h-4 w-4" /> Premium Wallpapers & Expert Installation
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Book My Wallpaper
            </h1>
            <p className="mt-3 text-xl font-medium text-gray-900">Hyderabad</p>
            <p className="mt-5 text-base sm:text-lg text-gray-600">
              Elevate your walls with a curated catalogue and professional installation. Discover styles, get instant quotes, and schedule a free home consultation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo('booking')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Book a Consultation <Calendar className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo('gallery')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-gray-900 font-semibold ring-1 ring-gray-200 hover:bg-gray-50"
              >
                Browse Catalogue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500"/> 1000+ Designs</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-rose-600"/> Hyderabad Service</div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1507138451611-3001135909d3?q=80&w=1740&auto=format&fit=crop"
                alt="Luxury wallpaper interior"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block">
              <div className="rounded-xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-black/5">
                <p className="text-sm font-semibold text-gray-900">Free Home Visit</p>
                <p className="text-xs text-gray-600">Consultation & measurements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
