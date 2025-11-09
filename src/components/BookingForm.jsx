import { useState } from 'react';
import { Calendar, Mail, Phone, User } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit booking');
      await res.json();
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Book a Home Consultation</h2>
            <p className="mt-2 text-gray-600">Our Hyderabad team will visit, measure, and recommend the best designs for your space.</p>
            <ul className="mt-6 space-y-3 text-gray-700 text-sm">
              <li className="flex gap-2"><span className="text-rose-600">•</span> Free site visit and measurement</li>
              <li className="flex gap-2"><span className="text-rose-600">•</span> Curated catalogue on-site</li>
              <li className="flex gap-2"><span className="text-rose-600">•</span> Same-day quote & scheduling</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            {submitted ? (
              <div className="text-center py-10">
                <p className="text-2xl font-semibold text-gray-900">Thank you!</p>
                <p className="mt-2 text-gray-600">Our team will reach out shortly to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Field label="Full Name">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                  </div>
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input name="phone" value={form.phone} onChange={onChange} required pattern="[0-9]{10}" placeholder="10-digit number" className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                    </div>
                  </Field>
                  <Field label="Email (optional)">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input name="email" value={form.email} onChange={onChange} type="email" placeholder="you@example.com" className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                    </div>
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Preferred Date">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input name="date" value={form.date} onChange={onChange} required type="date" className="w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                    </div>
                  </Field>
                  <Field label="Address/Area">
                    <input name="address" value={form.address} onChange={onChange} required placeholder="Your locality in Hyderabad" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                  </Field>
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-rose-600 px-4 py-3 text-white font-semibold hover:bg-rose-700 disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
                <p className="text-xs text-gray-500">By booking, you agree to be contacted on phone/WhatsApp for confirmation.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}
