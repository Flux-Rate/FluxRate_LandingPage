import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { HowItWorksContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type HowItWorksProps = {
  content: HowItWorksContent;
};

const HowItWorks = ({ content }: HowItWorksProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('how_it_works');
    }
  }, [isInView]);

  return (
    <motion.section
      id="how"
      ref={sectionRef}
      aria-labelledby="how-title"
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
            System architecture
          </div>
          <h2 id="how-title" className="text-3xl font-semibold sm:text-4xl">
            How FluxRate orchestrates adaptive pricing
          </h2>
          <p className="text-base text-muted">
            The platform ingests real-world signals, applies intelligence, actuates changes, and
            learns from the results for compounding outcomes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-panel/60 p-6 shadow-soft backdrop-blur"
            >
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-dashed border-accent/40 bg-accent/10 p-6 text-sm text-accent">
          {content.deployment}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
