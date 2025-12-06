import React from 'react';
import { render, screen } from '@testing-library/react';
import ShelterSupportSection from './ShelterSupportSection';

jest.mock(
  '../Button/Button',
  () =>
    (
      props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children: React.ReactNode;
      }
    ) => <button {...props}>{props.children}</button>
);

describe('ShelterSupportSection', () => {
  it('renders section with heading and button', () => {
    render(<ShelterSupportSection />);
    expect(
      screen.getByText(
        /Додавайте тварин у каталог та отримуйте донати, корм та ліки від небайдужих людей/
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Зареєструвати притулок')).toBeInTheDocument();
  });
});
