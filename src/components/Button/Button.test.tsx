import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from './Button';

describe('Button Component', () => {
  describe('rendering', () => {
    test('renders button with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('always includes base button class', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('button');
    });
  });

  describe('variants', () => {
    test('applies primary variant class when no variant is specified', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('button--primary');
    });

    test('applies secondary variant class when variant is secondary', () => {
      render(<Button variant="secondary">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('button--secondary');
    });

    test('applies action variant class when variant is action', () => {
      render(<Button variant="action">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('button--action');
    });
  });

  describe('className prop', () => {
    test('renders without extra classes when className is not provided', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.className).toBe('button button--primary');
    });

    test('appends className after variant classes', () => {
      render(<Button className="custom-layout">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.className).toBe('button button--primary custom-layout');
    });

    test('supports multiple classes in className prop', () => {
      render(
        <Button variant="secondary" className="mt-4 self-end">
          Click me
        </Button>
      );
      const button = screen.getByText('Click me');
      expect(button.className).toBe('button button--secondary mt-4 self-end');
    });
  });

  describe('interactions', () => {
    test('calls onClick handler when button is clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByText('Click me');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('size CSS variables (regression guards)', () => {
    test('sets --btn-height CSS variable from height prop', () => {
      render(<Button height={80}>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.style.getPropertyValue('--btn-height')).toBe('80px');
    });

    test('sets --btn-height-mobile CSS variable from heightMobile prop', () => {
      render(<Button heightMobile={64}>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.style.getPropertyValue('--btn-height-mobile')).toBe('64px');
    });

    test('sets --btn-max-width CSS variable from maxWidth prop', () => {
      render(<Button maxWidth={200}>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.style.getPropertyValue('--btn-max-width')).toBe('200px');
    });

    test('sets --btn-max-width-mobile CSS variable from maxWidthMobile prop', () => {
      render(<Button maxWidthMobile={150}>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.style.getPropertyValue('--btn-max-width-mobile')).toBe(
        '150px'
      );
    });

    test('supports string values for size props', () => {
      render(<Button height="3rem">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.style.getPropertyValue('--btn-height')).toBe('3rem');
    });

    test('does not set CSS variable when size prop is not provided', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button.style.getPropertyValue('--btn-height')).toBe('');
    });
  });

  describe('to prop', () => {
    test('renders a link with href and button classes', () => {
      render(
        <MemoryRouter>
          <Button to="/uk/shelter/pets/new" variant="secondary" height={64}>
            Add pet
          </Button>
        </MemoryRouter>
      );
      const link = screen.getByRole('link', { name: 'Add pet' });
      expect(link).toHaveAttribute('href', '/uk/shelter/pets/new');
      expect(link.className).toBe('button button--secondary');
      expect(link.style.getPropertyValue('--btn-height')).toBe('64px');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
