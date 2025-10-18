import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import type { VoiceOfCustomerContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type VOCCarouselProps = {
  content: VoiceOfCustomerContent;
};

const AUTO_ADVANCE_MS = 6000;

const VOCCarousel = ({ content }: VOCCarouselProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (isInView) {
      trackView('voice_of_customer');
    }
  }, [isInView]);

  useEffect(() => {
    if (paused) {
      return;
    }

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % content.quotes.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [paused, content.quotes.length]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="voc-title"
      tabIndex={-1}
      className="bg-bg/90 py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center lg:px-8">
        <div className="inline-flex rounded-full border border-white/10 bg-panel/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
          Voice of customer
        </div>
        <h2 id="voc-title" className="text-2xl font-semibold sm:text-3xl">
          {content.headline}
        </h2>
        <div
          className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-panel/70 p-8 shadow-soft backdrop-blur"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={content.quotes[index]}
              className="text-lg font-medium text-ink"
              {...(!shouldReduceMotion
                ? {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -12 },
                    transition: { duration: 0.4, ease: 'easeOut' },
                  }
                : {})}
            >
              “{content.quotes[index]}”
            </motion.p>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {content.quotes.map((quote, dotIndex) => (
              <button
                key={quote}
                type="button"
                onClick={() => setIndex(dotIndex)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  dotIndex === index ? 'bg-accent' : 'bg-muted/40 hover:bg-muted/70'
                }`}
                aria-label={`Show testimonial ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VOCCarousel;
