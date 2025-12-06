import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock(
  '../../Button/Button',
  () => (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{props.children}</button>
  )
);

describe('ContactForm', () => {
  it('renders all fields and button', () => {
    render(<ContactForm />);
    expect(screen.getByText('contact.contact_us')).toBeInTheDocument();
    expect(screen.getByText('contact.contact_description')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('contact.name_placeholder')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('contact.phone_placeholder')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('contact.message_placeholder')
    ).toBeInTheDocument();

    expect(screen.getByText('contact.submit_button')).toBeInTheDocument();
  });

  it('shows required errors on submit', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByText('contact.submit_button'));

    expect(await screen.findAllByText('errors.required')).toHaveLength(2);
  });

  it('submits form with valid data', async () => {
    window.alert = jest.fn();

    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText('contact.name_placeholder'), {
      target: { value: 'Test Name' },
    });
    fireEvent.change(screen.getByPlaceholderText('contact.phone_placeholder'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('contact.message_placeholder'),
      {
        target: { value: 'Test message' },
      }
    );

    fireEvent.click(screen.getByText('contact.submit_button'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining('Test message')
      );
    });
  });
});
