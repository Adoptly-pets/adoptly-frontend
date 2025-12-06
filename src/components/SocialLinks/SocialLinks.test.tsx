import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

jest.mock('../Icon/Icon', () => ({
  Icon: (props: {
    id: string;
    className?: string;
    size?: number | string;
    height?: number | string;
  }) => <span data-testid={`icon-mock-${props.id}`} />,
}));

describe('SocialLinks', () => {
  it('renders all social links with correct hrefs and icons', () => {
    render(<SocialLinks />);
    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com');
    expect(screen.getByTestId('icon-mock-icon-instagram')).toBeInTheDocument();

    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com');
    expect(screen.getByTestId('icon-mock-icon-facebook')).toBeInTheDocument();

    const tiktokLink = screen.getByRole('link', { name: 'TikTok' });
    expect(tiktokLink).toHaveAttribute('href', 'https://www.tiktok.com');
    expect(screen.getByTestId('icon-mock-icon-tiktok')).toBeInTheDocument();
  });

  it('adds menu class when isMobileMenu is true', () => {
    render(<SocialLinks isMobileMenu={true} />);
    expect(
      screen.getByRole('link', { name: 'Instagram' }).parentElement
    ).toHaveClass('social-nav', 'menu');
  });

  it('does not add menu class when isMobileMenu is false', () => {
    render(<SocialLinks isMobileMenu={false} />);
    expect(
      screen.getByRole('link', { name: 'Instagram' }).parentElement
    ).toHaveClass('social-nav');
    expect(
      screen.getByRole('link', { name: 'Instagram' }).parentElement
    ).not.toHaveClass('menu');
  });
});
