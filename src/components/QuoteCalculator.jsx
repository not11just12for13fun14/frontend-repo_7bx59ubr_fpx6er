import { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';

export default function QuoteCalculator() {
  const [width, setWidth] = useState(''); // in feet
  const [height, setHeight] = useState(''); // in feet
  const [price, setPrice] = useState(150); // ₹ per sq.ft
  const [install, setInstall] = useState(40); // ₹ per sq.ft

  const area = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return w * h;
  }, [width, height]);

  const materialCost = useMemo(() => Math.round(area * price), [area, price]);
  const installCost = useMemo(() => Math.round(area * install), [area, install]);
  const total = materialCost + installCost;

  return (
    <section id="quote" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900">Instant Quote Calculator</h2>
          <p className="mt-2 text-gray-600">Estimate materials and installation based on your wall size.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl ring-1 ring-gray-200 bg-gray-50 p-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Wall Width (ft)">
                <input value={width} onChange={(e) => setWidth(e.target.value)} type="number" min="0" step="0.1" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </Field>
              <Field label="Wall Height (ft)">
                <input value={height} onChange={(e) => setHeight(e.target.value)} type="number" min="0" step="0.1" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </Field>
              <Field label="Wallpaper (₹/sq.ft)">
                <input value={price} onChange={(e) => setPrice(parseFloat(e.target.value)||0)} type="number" min="0" step="1" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </Field>
              <Field label="Installation (₹/sq.ft)">
                <input value={install} onChange={(e) => setInstall(parseFloat(e.target.value)||0)} type="number" min="0" step="1" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </Field>
            </div>
            <p className="mt-4 text-sm text-gray-600">Pro tip: Typical wall height is 8–10 ft. Our team confirms on-site and optimizes roll usage.</p>
          </div>

          <div className="lg:col-span-2 rounded-2xl ring-1 ring-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 font-semibold"><Calculator className="h-5 w-5"/> Estimate</div>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Wall Area">{area.toFixed(2)} sq.ft</Row>
              <Row label="Material Cost">₹{materialCost.toLocaleString()}</Row>
              <Row label="Installation">₹{installCost.toLocaleString()}</Row>
              <div className="h-px bg-gray-200 my-2"/>
              <Row label="Estimated Total" bold>₹{total.toLocaleString()}</Row>
            </dl>
            <button onClick={() => document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})} className="mt-6 w-full rounded-lg bg-rose-600 px-4 py-3 text-white font-semibold hover:bg-rose-700">Book a Free Site Visit</button>
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

function Row({ label, children, bold }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={`text-gray-600 ${bold ? 'font-semibold text-gray-900' : ''}`}>{label}</dt>
      <dd className={`text-gray-900 ${bold ? 'font-bold' : ''}`}>{children}</dd>
    </div>
  );
}
