import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { ProblemContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type ProblemProps = {
  content: ProblemContent;
};

const Problem = ({ content }: ProblemProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('problem');
    }
  }, [isInView]);

  return (
    <motion.section
      id="problem"
      ref={sectionRef}
      aria-labelledby="problem-title"
      tabIndex={-1}
      className="bg-bg py-20 sm:py-24"
      {...(!shouldReduceMotion
        ? {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
            transition: { duration: 0.6, ease: 'easeOut' },
          }
        : {})}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-8">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex rounded-full border border-white/10 bg-panel/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            The problem
          </div>
          <h2 id="problem-title" className="text-3xl font-semibold sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-base text-muted">{content.description}</p>
          <ul className="grid gap-3 text-sm text-muted/90 sm:grid-cols-2">
            {content.pains.map((pain) => (
              <li
                key={pain}
                className="rounded-2xl border border-white/5 bg-panel/40 px-4 py-3 shadow-soft"
              >
                {pain}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-panel/70 p-6 shadow-soft"
              >
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-dashed border-accent/40 bg-panel/40 p-6 text-sm text-muted">
            Demand outstrips supply in hotspots while stagnant rates erode RevPAS. FluxRate builds
            the adaptive layer static spreadsheets cannot.
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Problem;
