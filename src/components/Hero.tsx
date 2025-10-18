import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import type { HeroContent } from '../content/siteContent';
import { trackCTA, trackView } from '../utils/analytics';

type HeroProps = {
  content: HeroContent;
};

const Hero = ({ content }: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('hero');
    }
  }, [isInView]);

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="relative isolate overflow-hidden bg-gradient-to-br from-panel via-bg to-panel pt-32 text-ink"
      {...(!shouldReduceMotion
        ? {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
            transition: { duration: 0.6, ease: 'easeOut' },
          }
        : {})}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.18),_transparent_50%)]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 text-center lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-panel/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            Adaptive pricing for physical assets
          </span>
          <h1 id="hero-title" className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">{content.subtitle}</p>
        </div>
        <ul className="mx-auto grid max-w-2xl gap-4 text-left sm:grid-cols-3 sm:text-sm">
          {content.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-panel/60 p-4 shadow-soft"
            >
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        {(content.primaryCta || content.secondaryCta) && (
          <div
            className={`flex flex-col items-center justify-center gap-4 ${
              content.primaryCta && content.secondaryCta ? 'sm:flex-row' : 'sm:items-center'
            }`}
          >
            {content.primaryCta && (
              <Link
                to={{ pathname: '/', hash: content.primaryCta.href }}
                onClick={() => trackCTA('hero_primary_cta')}
                className="w-full rounded-full bg-accent px-6 py-3 text-center text-base font-semibold text-bg transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-panel sm:w-auto"
              >
                {content.primaryCta.label}
              </Link>
            )}
            {content.secondaryCta && (
              <Link
                to={{ pathname: '/', hash: content.secondaryCta.href }}
                onClick={() => trackCTA('hero_secondary_cta')}
                className="w-full rounded-full border border-white/10 px-6 py-3 text-center text-base font-semibold text-ink transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-panel sm:w-auto"
              >
                {content.secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Hero;
