import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFound404 from './NotFound404';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock(
  '../../components/Button/Button',
  () =>
    (
      props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children: React.ReactNode;
      }
    ) => <button {...props}>{props.children}</button>
);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFound404', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders images, text and button', () => {
    render(<NotFound404 />);
    expect(screen.getByText('notFoundPage.text')).toBeInTheDocument();
    expect(screen.getByText('notFoundPage.button')).toBeInTheDocument();

    expect(document.querySelector('.footprint1')).toBeInTheDocument();
    expect(document.querySelector('.notFound-img')).toBeInTheDocument();
    expect(document.querySelector('.footprint2')).toBeInTheDocument();
  });

  it('calls navigate when button is clicked', () => {
    render(<NotFound404 />);
    fireEvent.click(screen.getByText('notFoundPage.button'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
