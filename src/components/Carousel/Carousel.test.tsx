import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

// Моки для Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Pagination: () => null,
}));

jest.mock('../Icon/Icon', () => ({
  Icon: () => <span data-testid="icon-mock" />,
}));

jest.mock('react-responsive', () => ({
  useMediaQuery: () => false,
}));

describe('Carousel', () => {
  it('renders section and images', () => {
    render(<Carousel />);
    expect(screen.getByText('Фото щасливих усиновлювачів')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });
});
