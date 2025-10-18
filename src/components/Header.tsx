import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../content/siteContent';

type HeaderProps = {
  logo: string;
  logoAlt: string;
  navItems: NavItem[];
};

const Header = ({ logo, logoAlt, navItems }: HeaderProps) => {
  const { hash } = useLocation();

  const isActive = (href: string) => hash === href;

  const navLinkClasses = (href: string, extra?: string) =>
    [
      'rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel sm:px-3',
      isActive(href) ? 'text-accent' : 'text-muted hover:text-ink',
      extra ?? '',
    ]
      .join(' ')
      .trim();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-panel/85 backdrop-blur">
      <Disclosure as="nav" aria-label="Main navigation">
        {({ open }) => (
          <>
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-5 sm:px-6 lg:px-8">
              <Link
                to="/"
                className="flex flex-none items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
              >
                <img src={logo} alt={logoAlt} className="h-8 w-auto sm:h-9" />
                <span className="text-sm font-semibold tracking-wide text-ink sm:text-base">
                  FluxRate
                </span>
              </Link>
              <nav className="hidden flex-1 basis-0 justify-end lg:flex">
                <div className="flex flex-wrap items-center justify-end gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={{ pathname: '/', hash: item.href }}
                      className={navLinkClasses(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <Disclosure.Button className="inline-flex items-center justify-center rounded-full bg-panel/60 p-2 text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel lg:hidden">
                <span className="sr-only">Toggle navigation</span>
                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </Disclosure.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition duration-150 ease-out"
              enterFrom="transform opacity-0 -translate-y-2"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition duration-100 ease-in"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 -translate-y-2"
            >
              <Disclosure.Panel className="border-t border-white/5 bg-panel/95 px-4 pb-6 pt-2 shadow-soft lg:hidden">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={{ pathname: '/', hash: item.href }}
                      className={navLinkClasses(
                        item.href,
                        'w-full rounded-2xl bg-panel/70 px-3 py-3 text-base',
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Header;
