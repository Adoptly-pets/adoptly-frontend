import { render, screen, fireEvent } from '@testing-library/react';
import ModalNavigation from './ModalNavigation';

jest.mock(
  '../Navigation/Navigation',
  () => (props: { className?: string; onLinkClick?: () => void }) => (
    <nav
      data-testid="navigation-mock"
      className={props.className}
      onClick={props.onLinkClick}
    >
      Navigation content
    </nav>
  )
);

describe('ModalNavigation', () => {
  it('renders Navigation with passed className', () => {
    render(<ModalNavigation className="test-class" />);
    const nav = screen.getByTestId('navigation-mock');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('test-class');
  });

  it('calls onLinkClick when nav is clicked', () => {
    const onLinkClick = jest.fn();
    render(<ModalNavigation onLinkClick={onLinkClick} />);
    fireEvent.click(screen.getByTestId('navigation-mock'));
    expect(onLinkClick).toHaveBeenCalled();
  });
});
