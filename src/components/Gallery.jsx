import { useEffect, useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

export default function Gallery() {
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState({ style: 'All', color: 'All', room: 'All', price: 'All' });
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND}/api/wallpapers`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setItems([]);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((w) => {
      const matchesQ = q ? w.title?.toLowerCase().includes(q.toLowerCase()) : true;
      const matchesStyle = filters.style === 'All' || w.style === filters.style;
      const matchesColor = filters.color === 'All' || w.color === filters.color;
      const matchesRoom = filters.room === 'All' || w.room === filters.room;
      const matchesPrice =
        filters.price === 'All' ||
        (filters.price === 'Under 150' && Number(w.price) < 150) ||
        (filters.price === '150 - 200' && Number(w.price) >= 150 && Number(w.price) <= 200) ||
        (filters.price === '200+' && Number(w.price) > 200);
      return matchesQ && matchesStyle && matchesColor && matchesRoom && matchesPrice;
    });
  }, [q, filters, items]);

  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Wallpaper Catalogue</h2>
            <p className="mt-2 text-gray-600">Search and filter by style, color, room and price.</p>
          </div>
          <div className="flex-1 sm:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search designs"
                className="w-full sm:w-80 rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Select label="Style" value={filters.style} onChange={(v) => update('style', v)} options={[ 'All', 'Modern', 'Nature', 'Classic', 'Industrial' ]} />
          <Select label="Color" value={filters.color} onChange={(v) => update('color', v)} options={[ 'All', 'Neutral', 'Green', 'Gold', 'Gray' ]} />
          <Select label="Room" value={filters.room} onChange={(v) => update('room', v)} options={[ 'All', 'Living Room', 'Bedroom', 'Dining', 'Office' ]} />
          <Select label="Price" value={filters.price} onChange={(v) => update('price', v)} options={[ 'All', 'Under 150', '150 - 200', '200+' ]} />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((w, idx) => (
            <article key={`${w.title}-${idx}`} className="group rounded-xl overflow-hidden bg-white shadow ring-1 ring-gray-200">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={w.img} alt={w.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{w.title}</h3>
                <p className="text-sm text-gray-600">{w.style} • {w.color} • {w.room}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-rose-600 font-bold">₹{Number(w.price).toFixed(0)}/sq.ft</span>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700">
                    <Filter className="h-4 w-4" /> Details
                  </button>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-600">No wallpapers found.</div>
          )}
        </div>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
