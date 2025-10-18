import { useEffect, useRef } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { TeamContent } from '../content/siteContent';
import { trackCTA, trackView } from '../utils/analytics';
import HarshaImage from '../assets/Harsha_profile.jpg';
import VamshiImage from '../assets/Vamshi_profile.jpg';

type TeamProps = {
  content: TeamContent;
};

const imageMap: Record<string, string> = {
  harsha_profile: HarshaImage,
  vamshi_profile: VamshiImage,
};

const resolveImage = (image: string) => {
  const key = image.split('.')[0]?.toLowerCase() ?? '';
  return imageMap[key] ?? HarshaImage;
};

const Team = ({ content }: TeamProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('team');
    }
  }, [isInView]);

  return (
    <motion.section
      id="team"
      ref={sectionRef}
      aria-labelledby="team-title"
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
          <div className="inline-flex rounded-full border border-white/10 bg-bg/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            Team
          </div>
          <h2 id="team-title" className="text-3xl font-semibold sm:text-4xl">
            {content.headline}
          </h2>
          <p className="text-base text-muted">{content.subheadline}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.members.map((member, index) => (
            <motion.article
              key={member.fullName}
              className="group flex flex-col rounded-3xl border border-white/10 bg-bg/70 p-6 shadow-soft backdrop-blur"
              {...(!shouldReduceMotion
                ? {
                    initial: { opacity: 0, y: 24 },
                    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                    transition: { duration: 0.4, delay: 0.1 * index, ease: 'easeOut' },
                  }
                : {})}
            >
              <div className="flex items-center gap-4">
                <img
                  src={resolveImage(member.image)}
                  alt={`${member.fullName} headshot`}
                  className="h-20 w-20 flex-shrink-0 rounded-2xl border border-white/10 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-lg font-semibold text-ink">{member.fullName}</p>
                  <p className="text-sm text-accent">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">{member.description}</p>
              <button
                type="button"
                onClick={() => {
                  trackCTA('team_portfolio_click', { member: member.fullName });
                  if (typeof window !== 'undefined' && typeof window.open === 'function') {
                    window.open(member.portfolio, '_blank', 'noreferrer');
                  }
                }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                View Portfolio
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Team;
