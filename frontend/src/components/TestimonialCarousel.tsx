import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Testimonial } from '@/types';
import { fetchTestimonials } from '@/lib/api';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(() => setTestimonials([]));
  }, []);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return null;
  }

  const active = testimonials[current];

  return (
    <section
      className="mx-auto mt-16 max-w-4xl rounded-3xl bg-white/80 p-10 shadow-xl backdrop-blur transition"
      aria-label="Customer testimonials"
    >
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-midnight/50">Customer Love</p>
          <h2 className="mt-2 text-3xl font-semibold text-midnight">What our clients are saying</h2>
          <p className="mt-4 text-lg text-midnight/70">{active.message}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex items-center gap-1" aria-label={`${active.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <StarIcon
                  key={idx}
                  className={`h-5 w-5 ${idx < active.rating ? 'text-blush' : 'text-midnight/20'}`}
                />
              ))}
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-midnight/60">{active.customerName}</span>
          </div>
        </div>
        <div className="hidden flex-shrink-0 md:block">
          <ul className="space-y-4">
            {testimonials.map((testimonial, idx) => (
              <li key={testimonial.id} className="flex items-center gap-2 text-sm text-midnight/60">
                <button
                  aria-label={`View testimonial from ${testimonial.customerName}`}
                  className={`h-3 w-3 rounded-full ${
                    idx === current ? 'bg-midnight' : 'bg-midnight/20'
                  } transition focus-ring`}
                  onClick={() => setCurrent(idx)}
                />
                <span>{testimonial.customerName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

