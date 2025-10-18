import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { TrustContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type TrustBarProps = {
  content: TrustContent;
};

const TrustBar = ({ content }: TrustBarProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('trust_bar');
    }
  }, [isInView]);

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Trust and compliance"
      tabIndex={-1}
      className="bg-bg/95 py-10"
      {...(!shouldReduceMotion
        ? {
            initial: { opacity: 0, y: 24 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
            transition: { duration: 0.4, ease: 'easeOut' },
          }
        : {})}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-6 text-center text-sm text-muted lg:px-8">
        {content.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-panel/70 px-4 py-2 text-xs uppercase tracking-[0.18em]"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default TrustBar;
