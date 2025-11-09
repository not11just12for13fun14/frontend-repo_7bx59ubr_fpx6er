import { useEffect, useMemo, useState } from 'react';
import { CalendarDays } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || '';

function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = [];
  let day = 1 - startDay;
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(year, month, day);
      week.push({
        date,
        inMonth: date.getMonth() === month,
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        ymd: date.toISOString().slice(0, 10),
      });
      day++;
    }
    weeks.push(week);
  }
  return weeks;
}

export default function BookingsCalendar() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(false);

  const matrix = useMemo(() => getMonthMatrix(cursor.getFullYear(), cursor.getMonth()), [cursor]);

  useEffect(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1).toISOString().slice(0, 10);
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).toISOString().slice(0, 10);
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND}/api/bookings?start=${start}&end=${end}`);
        const data = await res.json();
        const byDate = {};
        (Array.isArray(data) ? data : []).forEach((b) => {
          const k = b.date;
          byDate[k] = byDate[k] || [];
          byDate[k].push(b);
        });
        setBookings(byDate);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cursor]);

  const monthName = cursor.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><CalendarDays className="h-6 w-6" /> Bookings Calendar</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="rounded-md border px-3 py-1.5 text-sm hover:bg-white">Prev</button>
            <div className="text-sm text-gray-700 w-40 text-center">{monthName}</div>
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="rounded-md border px-3 py-1.5 text-sm hover:bg-white">Next</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
            <div key={d} className="text-xs font-medium text-gray-600 text-center">{d}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {matrix.flat().map((cell) => {
            const dayBookings = bookings[cell.ymd] || [];
            return (
              <div key={cell.key} className={`min-h-[84px] rounded-lg border p-2 ${cell.inMonth ? 'bg-white' : 'bg-gray-100 opacity-60'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{cell.date.getDate()}</span>
                  {dayBookings.length > 0 && (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">{dayBookings.length}</span>
                  )}
                </div>
                <div className="mt-1 space-y-1">
                  {dayBookings.slice(0, 2).map((b) => (
                    <div key={b.id} className="truncate text-xs text-gray-700">{b.name} — {b.phone}</div>
                  ))}
                  {dayBookings.length > 2 && (
                    <div className="text-[10px] text-gray-500">+{dayBookings.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {loading && <div className="mt-4 text-sm text-gray-500">Loading bookings...</div>}
      </div>
    </section>
  );
}
