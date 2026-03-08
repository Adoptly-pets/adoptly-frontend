import { render, screen, fireEvent } from '@testing-library/react';
import Drawer from './Drawer';

describe('Drawer', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('renders children when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </Drawer>
    );
    fireEvent.click(document.querySelector('.drawer-overlay')!);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </Drawer>
    );
    fireEvent.click(screen.getByText('Test Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('sets body overflow to hidden when open and restores on close', () => {
    const { rerender } = render(
      <Drawer isOpen={true} onClose={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Drawer isOpen={false} onClose={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe('');
  });
});
