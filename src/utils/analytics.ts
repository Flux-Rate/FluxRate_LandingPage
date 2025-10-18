/* eslint-disable no-console */

export const trackView = (section: string) => {
  console.log(`[analytics] view: ${section}`);
};

export const trackCTA = (name: string, details?: Record<string, unknown>) => {
  console.log(`[analytics] cta: ${name}`, details ?? {});
};

export default {
  trackView,
  trackCTA,
};
