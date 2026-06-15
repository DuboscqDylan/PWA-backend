import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { NavItem } from './NavItem';

/**
 * Esto se lo tenía que preguntar a la IA que no entendía. Memory Router guarda la información
 * de navegación en la memoria, y ayuda a renderizarlo
 * @param {React.ReactElement} ui - El componente a renderizar
 * @param {object} options
 * @param {string} options.route - URL inicial (default "/").
 */

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('NavItem', () => {

  it('applies active styling and aria-current when the route matches', () => {
    renderWithRouter(<NavItem to="/about" label="About" />, { route: '/about' });

    const link = screen.getByRole('link', { name: 'About' });
    const labelSpan = screen.getByText('About');
    const underline = labelSpan.querySelector('span.absolute');

    expect(labelSpan).not.toHaveClass('opacity-70');
    expect(underline).toHaveClass('w-1/2');
    expect(underline).not.toHaveClass('w-0');
    expect(underline).toHaveClass('left-1/4');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('applies inactive styling and no aria-current when the route does not match', () => {
    renderWithRouter(<NavItem to="/about" label="About" />, { route: '/' });

    const link = screen.getByRole('link', { name: 'About' });
    const labelSpan = screen.getByText('About');
    const underline = labelSpan.querySelector('span.absolute');

    expect(labelSpan).toHaveClass('opacity-70');
    expect(underline).toHaveClass('w-0');
    expect(underline).not.toHaveClass('w-1/2');
    expect(link).not.toHaveAttribute('aria-current');
  });

  // Checkear variantes del logo
  it('applies logo typography classes when isLogo is true', () => {
    renderWithRouter(<NavItem to="/" label="Spoofify" isLogo />);
    const labelSpan = screen.getByText('Spoofify');

    expect(labelSpan).toHaveClass('text-lg');
    expect(labelSpan).toHaveClass('font-semibold');
    expect(labelSpan).toHaveClass('tracking-tight');
  });

  it('does not apply logo classes when isLogo is false or undefined', () => {
    renderWithRouter(<NavItem to="/favorites" label="Favorites" />);
    const labelSpan = screen.getByText('Favorites');

    expect(labelSpan).not.toHaveClass('text-lg');
    expect(labelSpan).not.toHaveClass('font-semibold');
    expect(labelSpan).not.toHaveClass('tracking-tight');
  });

  it('always renders the decorative underline span', () => {
    renderWithRouter(<NavItem to="/" label="Home" />);
    const labelSpan = screen.getByText('Home');
    const underline = labelSpan.querySelector('span.absolute');

    expect(underline).toBeInTheDocument();

    expect(underline).toHaveClass('bottom-0');
    expect(underline).toHaveClass('left-1/2');
    expect(underline).toHaveClass('transition-all');
  });

  it('has the group class to enable underline hover effect', () => {
    renderWithRouter(<NavItem to="/" label="Home" />);
    const labelSpan = screen.getByText('Home');

    expect(labelSpan).toHaveClass('group');
  });

  it('combines logo and active styles when isLogo and the route matches', () => {
    renderWithRouter(<NavItem to="/" label="Spoofify" isLogo />, { route: '/' });

    const labelSpan = screen.getByText('Spoofify');
    const underline = labelSpan.querySelector('span.absolute');

    expect(labelSpan).toHaveClass('text-lg');
    expect(labelSpan).toHaveClass('font-semibold');

    expect(underline).toHaveClass('w-1/2');

    expect(labelSpan).not.toHaveClass('opacity-70');
  });
});