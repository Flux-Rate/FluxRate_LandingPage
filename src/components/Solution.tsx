import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { SolutionContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type SolutionProps = {
  content: SolutionContent;
};

const Solution = ({ content }: SolutionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('solution');
    }
  }, [isInView]);

  return (
    <motion.section
      id="solution"
      ref={sectionRef}
      aria-labelledby="solution-title"
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
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            Closed-loop CPS
          </div>
          <h2 id="solution-title" className="text-3xl font-semibold sm:text-4xl">
            Adaptive pricing through a cyber-physical feedback loop
          </h2>
          <p className="text-base text-muted">
            FluxRate senses real conditions, computes optimal prices, actuates them in the physical
            world, and optimizes continuously. Operators retain control with transparent guardrails.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-bg/60 p-6 shadow-soft backdrop-blur"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm uppercase tracking-[0.2em] text-muted">Pillars</span>
          {content.pillars.map((pillar) => (
            <span
              key={pillar}
              className="rounded-full border border-white/10 bg-bg/60 px-4 py-2 text-sm font-semibold text-ink"
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Solution;
