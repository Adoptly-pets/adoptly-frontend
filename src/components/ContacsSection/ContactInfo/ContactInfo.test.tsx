import { render, screen } from '@testing-library/react';
import ContactInfo from './ContactInfo';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../SocialLinks/SocialLinks', () => () => (
  <div data-testid="social-links-mock" />
));

describe('ContactInfo', () => {
  it('renders all contact info fields and socials', () => {
    render(<ContactInfo />);
    expect(screen.getByText('contact.address_label')).toBeInTheDocument();
    expect(screen.getByText('contact.address_value')).toBeInTheDocument();

    expect(screen.getByText('contact.phone_label')).toBeInTheDocument();
    expect(screen.getByText('contact.phone_value')).toBeInTheDocument();

    expect(screen.getByText('contact.email_label')).toBeInTheDocument();
    expect(screen.getByText('contact.email_value')).toBeInTheDocument();

    expect(screen.getByText('contact.socials')).toBeInTheDocument();
    expect(screen.getByTestId('social-links-mock')).toBeInTheDocument();
  });
});
