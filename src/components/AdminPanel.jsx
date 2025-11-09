import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

export default function AdminPanel() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', style: '', color: '', room: '', price: '', img: '' });
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => setForm({ title: '', style: '', color: '', room: '', price: '', img: '' });

  const fetchWallpapers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND}/api/wallpapers`);
      const data = await res.json();
      setWallpapers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Failed to load wallpapers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = { ...form, price: parseFloat(form.price || '0') };
      const res = await fetch(`${BACKEND}/api/wallpapers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create wallpaper');
      resetForm();
      await fetchWallpapers();
    } catch (e) {
      setError(e.message || 'Failed to create');
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id) => {
    try {
      setError('');
      const res = await fetch(`${BACKEND}/api/wallpapers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchWallpapers();
    } catch (e) {
      setError(e.message || 'Delete failed');
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <span className="text-xs text-gray-500">For internal use</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Add Wallpaper</h3>
              {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
              <form onSubmit={onSubmit} className="space-y-3">
                <Input label="Title" name="title" value={form.title} onChange={onChange} required />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Style" name="style" value={form.style} onChange={onChange} required />
                  <Input label="Color" name="color" value={form.color} onChange={onChange} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Room" name="room" value={form.room} onChange={onChange} required />
                  <Input label="Price (₹)" name="price" value={form.price} onChange={onChange} required type="number" step="0.01" min="0" />
                </div>
                <Input label="Image URL" name="img" value={form.img} onChange={onChange} required />
                <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-60">
                  <Plus className="h-4 w-4" /> {submitting ? 'Saving...' : 'Add Wallpaper'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Catalogue</h3>
              {loading && <span className="text-sm text-gray-500">Loading...</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wallpapers.map((w) => (
                <div key={w.title + w.img} className="rounded-xl border border-gray-200 overflow-hidden group bg-white">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img src={w.img} alt={w.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{w.title}</p>
                        <p className="text-xs text-gray-500">{w.style} • {w.color} • {w.room}</p>
                      </div>
                      <button onClick={() => w.id ? remove(w.id) : null} title="Delete" className="p-1.5 rounded-md text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">₹{Number(w.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {wallpapers.length === 0 && !loading && (
                <div className="col-span-full text-center py-12 text-gray-500">No wallpapers yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input {...props} className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
    </label>
  );
}
