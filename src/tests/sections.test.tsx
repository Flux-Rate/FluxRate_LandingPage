import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import Differentiators from '../components/Differentiators';
import UseCases from '../components/UseCases';
import VOCCarousel from '../components/VOCCarousel';
import KPIBand from '../components/KPIBand';
import Team from '../components/Team';
import PilotCTA from '../components/PilotCTA';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import TrustBar from '../components/TrustBar';
import { siteContent } from '../content/siteContent';

describe('Core sections', () => {
  it('render without crashing', () => {
    render(
      <MemoryRouter>
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
      </MemoryRouter>,
    );

    expect(
      screen.getByText(siteContent.hero.subtitle, { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText(siteContent.problem.stats[0].value)).toBeInTheDocument();
    expect(screen.getByText(siteContent.solution.steps[0].title)).toBeInTheDocument();
    expect(screen.getByText(siteContent.faq.items[0].question)).toBeInTheDocument();
  });
});
