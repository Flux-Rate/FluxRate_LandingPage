import { Link } from 'react-router-dom';
import type { NavItem } from '../content/siteContent';

type FooterProps = {
  navItems: NavItem[];
};

const Footer = ({ navItems }: FooterProps) => (
  <footer className="border-t border-white/5 bg-bg/95 py-10 text-sm text-muted">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
      <div className="space-y-2">
        <p className="text-base font-semibold text-ink">FluxRate</p>
        <p>Adaptive cyber-physical pricing for gated parking.</p>
        <div className="flex flex-col gap-1">
          <a
            href="mailto:hkuthadi@asu.edu"
            className="text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            hkuthadi@asu.edu
          </a>
          <a
            href="mailto:vamshin24@asu.edu"
            className="text-ink hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            vamshin24@asu.edu
          </a>
        </div>
      </div>
      <nav className="grid gap-3 sm:grid-cols-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={{ pathname: '/', hash: item.href }}
            className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="text-xs text-muted/80">
        <p>© {new Date().getFullYear()} FluxRate. All rights reserved.</p>
        <p className="mt-2">
          Privacy-first analytics. Adaptive pricing with human oversight by design.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
