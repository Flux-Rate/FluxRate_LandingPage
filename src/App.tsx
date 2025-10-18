import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Differentiators from './components/Differentiators';
import UseCases from './components/UseCases';
import VOCCarousel from './components/VOCCarousel';
import KPIBand from './components/KPIBand';
import Team from './components/Team';
import PilotCTA from './components/PilotCTA';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import TrustBar from './components/TrustBar';
import Footer from './components/Footer';
import { siteContent } from './content/siteContent';
import logo from '../FluxRate_logo.jpg';

const HEADER_OFFSET = 88;

const ScrollManager = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(hash);
    if (target instanceof HTMLElement) {
      const top =
        target.getBoundingClientRect().top + window.scrollY - (HEADER_OFFSET + 8);
      window.scrollTo({ top, behavior: 'smooth' });
      target.focus({ preventScroll: true });
    }
  }, [hash]);

  return null;
};

const App = () => (
  <>
    <a
      href="#main-content"
      className="absolute left-1/2 z-[999] -translate-x-1/2 -translate-y-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition focus:translate-y-4 focus:outline-none"
    >
      Skip to content
    </a>
    <Header
      logo={logo}
      logoAlt={siteContent.nav.logoAlt}
      navItems={siteContent.nav.items}
    />
    <ScrollManager />
    <main id="main-content" className="bg-bg text-ink">
      <Hero content={siteContent.hero} />
      <TrustBar content={siteContent.trust} />
      <Problem content={siteContent.problem} />
      <Solution content={siteContent.solution} />
      <HowItWorks content={siteContent.how} />
      <Differentiators content={siteContent.differentiators} />
      <UseCases content={siteContent.useCases} />
      <KPIBand content={siteContent.kpis} />
      <VOCCarousel content={siteContent.voiceOfCustomer} />
      <Team content={siteContent.team} />
      <PilotCTA content={siteContent.pilot} />
      <FAQ content={siteContent.faq} />
      <ContactForm content={siteContent.contact} />
    </main>
    <Footer navItems={siteContent.nav.items} />
  </>
);

export default App;
