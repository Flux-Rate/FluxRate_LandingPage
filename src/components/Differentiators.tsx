import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import type { DifferentiatorsContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type DifferentiatorsProps = {
  content: DifferentiatorsContent;
};

const Differentiators = ({ content }: DifferentiatorsProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('differentiators');
    }
  }, [isInView]);

  return (
    <motion.section
      id="diff"
      ref={sectionRef}
      aria-labelledby="diff-title"
      tabIndex={-1}
      className="bg-panel py-20 sm:py-24"
      {...(!shouldReduceMotion
        ? {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
            transition: { duration: 0.6, ease: 'easeOut' },
          }
        : {})}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex rounded-full border border-white/10 bg-bg/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            Differentiators
          </div>
          <h2 id="diff-title" className="text-3xl font-semibold sm:text-4xl">
            {content.headline}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-bg/60 p-6 shadow-soft backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Differentiators;
