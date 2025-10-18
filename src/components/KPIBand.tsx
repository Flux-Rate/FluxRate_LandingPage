import { useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import type { KpiContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type KPIBandProps = {
  content: KpiContent;
};

type ParsedValue = {
  prefix: string;
  suffix: string;
  value: number;
  decimals: number;
};

const parseValue = (raw: string): ParsedValue | null => {
  const match = raw.match(/[\d,.]+/);
  if (!match) {
    return null;
  }

  const numericSegment = match[0];
  const value = parseFloat(numericSegment.replace(/,/g, ''));
  const decimals = numericSegment.includes('.') ? numericSegment.split('.')[1].length : 0;
  const prefix = raw.slice(0, match.index ?? 0);
  const suffix = raw.slice((match.index ?? 0) + numericSegment.length);

  return { prefix, suffix, value, decimals };
};

const KPIBand = ({ content }: KPIBandProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (isInView) {
      trackView('kpi_band');
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      aria-label="Key performance indicators"
      tabIndex={-1}
      className="bg-bg/95 py-14"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 lg:px-8">
        <div className="flex w-full flex-col gap-6 rounded-3xl border border-white/10 bg-panel/80 px-6 py-8 text-center shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between md:text-left">
          {content.items.map((item) => (
            <ValueCard
              key={item.label}
              label={item.label}
              value={item.value}
              reduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type ValueCardProps = {
  value: string;
  label: string;
  reduceMotion: boolean;
};

const ValueCard = ({ value, label, reduceMotion }: ValueCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.9 });
  const parsed = useMemo(() => parseValue(value), [value]);
  const motionValue = useMotionValue(parsed?.value ?? 0);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) {
      return;
    }

    if (!isInView) {
      return;
    }

    if (reduceMotion) {
      setDisplay(`${parsed.prefix}${parsed.value}${parsed.suffix}`);
      return;
    }

    motionValue.set(0);
    const controls = animate(motionValue, parsed.value, {
      duration: 1.4,
      ease: 'easeOut',
    });

    const unsubscribe = motionValue.on('change', (latest) => {
      const formatted =
        parsed.decimals > 0 ? latest.toFixed(parsed.decimals) : Math.round(latest).toString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, motionValue, parsed, reduceMotion]);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
    }
  }, [parsed, value]);

  return (
    <motion.div
      ref={ref}
      className="flex-1 space-y-2"
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      animate={
        reduceMotion || isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
      transition={reduceMotion ? undefined : { duration: 0.4, ease: 'easeOut' }}
    >
      <div className="text-3xl font-semibold text-ink md:text-4xl">{display}</div>
      <p className="text-sm text-muted">{label}</p>
    </motion.div>
  );
};

export default KPIBand;
