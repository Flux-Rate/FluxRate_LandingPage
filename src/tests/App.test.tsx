import { render, screen } from '@testing-library/react';
import { MemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { siteContent } from '../content/siteContent';
import router from '../routes';

describe('App', () => {
  it('renders hero and navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /FluxRate: Adaptive Cyber-Physical Pricing System/,
      }),
    ).toBeInTheDocument();

    siteContent.nav.items.forEach((item) => {
      expect(screen.getAllByRole('link', { name: item.label })[0]).toBeInTheDocument();
    });
  });

  it('integrates with router configuration', () => {
    render(<RouterProvider router={router} />);
    expect(
      screen.getByText(/Revolutionizing parking revenue through intelligent/i),
    ).toBeInTheDocument();
  });
});
