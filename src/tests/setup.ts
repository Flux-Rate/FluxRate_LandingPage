import '@testing-library/jest-dom/vitest';

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;

  readonly rootMargin: string = '0px';

  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(public callback: IntersectionObserverCallback) {}

  disconnect(): void {}

  observe(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

const mockScrollTo: typeof window.scrollTo = (
  _arg1?: number | ScrollToOptions,
  _arg2?: number,
) => {
  return undefined;
};

window.scrollTo = mockScrollTo;
