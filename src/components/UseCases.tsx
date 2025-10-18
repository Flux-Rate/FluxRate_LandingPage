import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { UseCasesContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type UseCasesProps = {
  content: UseCasesContent;
};

const UseCases = ({ content }: UseCasesProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('use_cases');
    }
  }, [isInView]);

  return (
    <motion.section
      id="usecases"
      ref={sectionRef}
      aria-labelledby="usecases-title"
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
            Use cases
          </div>
          <h2 id="usecases-title" className="text-3xl font-semibold sm:text-4xl">
            {content.headline}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-panel/70 p-6 shadow-soft backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.isFuture && (
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    Future
                  </span>
                )}
              </div>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default UseCases;
