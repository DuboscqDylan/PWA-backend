import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NavBar } from './NavBar';

vi.mock('../NavItem/NavItem', () => ({
  NavItem: vi.fn(({ to, label, isLogo }) => (
    <a href={to} data-testid="nav-item" data-is-logo={isLogo ? 'true' : 'false'}>
      {label}
    </a>
  )),
}));


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Devuelve la key de la traducción
  }),
}))

describe('NavBar', () => {
  it('renders a nav element with the correct layout classes', () => {
    render(<NavBar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('flex', 'items-center', 'gap-4', 'text-sm');
  });

  it('renders all three NavItem links with correct labels', () => {
    render(<NavBar />);
    expect(screen.getByText('Spoofify')).toBeInTheDocument();
    expect(screen.getByText('favorites')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
  });

  it('passes isLogo={true} to the first NavItem', () => {
    render(<NavBar />);
    const navItems = screen.getAllByTestId('nav-item');
    expect(navItems).toHaveLength(3);

    expect(navItems[0]).toHaveAttribute('data-is-logo', 'true');
    expect(navItems[1]).toHaveAttribute('data-is-logo', 'false');
    expect(navItems[2]).toHaveAttribute('data-is-logo', 'false');
  });

  it('renders separators between items but not after the last', () => {
    render(<NavBar />);
    const separators = screen.getAllByText('|');
    expect(separators).toHaveLength(2);

    separators.forEach((sep) => {
      expect(sep).toHaveClass('opacity-40');
    });

    const container = screen.getByRole('navigation');
    const children = container.children; 
    expect(children).toHaveLength(3); 

    
    expect(children[0].children).toHaveLength(2); 
    expect(children[1].children).toHaveLength(2);
    expect(children[2].children).toHaveLength(1); 
  });

  it('uses translation keys "favorites" and "about"', () => {
    render(<NavBar />);
    expect(screen.getByText('favorites')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
  });
});