import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

// Mock the CSS import (handled by jest.config.ts moduleNameMapper)
jest.mock('./Navigation.css', () => ({}));

describe('Navigation Component', () => {
  it('renders navigation with all links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);

    const linkDetails = [
      { text: 'Головна', href: '/' },
      { text: 'Про нас', href: '/about' },
      { text: 'Як допомогти', href: '/how-to-help' },
      { text: 'Притулкам', href: '/shelters' },
      { text: 'Контакти', href: '/contacts' },
    ];

    linkDetails.forEach(({ text, href }, index) => {
      expect(links[index]).toHaveTextContent(text);
      expect(links[index]).toHaveAttribute('href', href);
    });
  });

  it('applies correct CSS classes to nav, ul, and li elements', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navElement = screen.getByRole('navigation');
    const listElement = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(navElement).toBeInTheDocument();
    expect(listElement).toHaveClass('list');
    expect(listItems).toHaveLength(5);
    listItems.forEach((item) => {
      expect(item).toHaveClass('item');
    });
  });

  it('renders links with correct react-router-dom to props', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    const expectedPaths = ['/', '/about', '/how-to-help', '/shelters', '/contacts'];

    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', expectedPaths[index]);
    });
  });
});