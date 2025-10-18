import { useEffect, useRef } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { FaqContent } from '../content/siteContent';
import { trackView } from '../utils/analytics';

type FAQProps = {
  content: FaqContent;
};

const FAQ = ({ content }: FAQProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      trackView('faq');
    }
  }, [isInView]);

  return (
    <motion.section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-title"
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
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex rounded-full border border-white/10 bg-bg/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            FAQ
          </div>
          <h2 id="faq-title" className="text-3xl font-semibold sm:text-4xl">
            {content.headline}
          </h2>
        </div>
        <div className="space-y-4">
          {content.items.map((item) => (
            <Disclosure key={item.question} as="div" className="rounded-2xl border border-white/10">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center justify-between gap-4 bg-bg/60 px-5 py-4 text-left text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel">
                    <span>{item.question}</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-150 ease-out"
                    enterFrom="transform opacity-0 -translate-y-1"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition duration-100 ease-in"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-1"
                  >
                    <Disclosure.Panel className="px-5 pb-4 text-sm text-muted">
                      {item.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
