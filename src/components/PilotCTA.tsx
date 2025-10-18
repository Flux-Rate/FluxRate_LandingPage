import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { PilotContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type PilotCTAProps = {
  content: PilotContent;
};

const PilotCTA = ({ content }: PilotCTAProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('pilot_plan');
    }
  }, [isInView]);

  return (
    <motion.section
      id="pilot"
      ref={sectionRef}
      aria-labelledby="pilot-title"
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
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex rounded-full border border-white/10 bg-panel/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            Pilot roadmap
          </div>
          <h2 id="pilot-title" className="text-3xl font-semibold sm:text-4xl">
            {content.headline}
          </h2>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/70 p-6 shadow-soft backdrop-blur">
          <div className="hidden h-1 w-full bg-white/10 md:block" />
          <div className="grid gap-6 md:grid-cols-4">
            {content.phases.map((phase, index) => (
              <div
                key={phase.title}
                className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-bg/60 p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold">{phase.title}</h3>
                <p className="text-sm text-muted">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PilotCTA;
