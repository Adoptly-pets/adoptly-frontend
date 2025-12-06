import React from 'react';
import { render, screen } from '@testing-library/react';
import BenefitsOfCooperation from './BenefitsOfCooperation';
import { BENEFITS_DATA } from '../../constants/BENEFITS_DATA';

type ChildrenProps = { children?: React.ReactNode };

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: ChildrenProps) => <div>{children}</div>,
  SwiperSlide: ({ children }: ChildrenProps) => <div>{children}</div>,
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock('swiper/modules', () => ({
  Pagination: () => null,
}));

describe('BenefitsOfCooperation', () => {
  it('renders section and at least one benefit', () => {
    render(<BenefitsOfCooperation />);
    expect(screen.getByText('Переваги співпраці')).toBeInTheDocument();
    expect(screen.getAllByText(BENEFITS_DATA[1].title).length).toBeGreaterThan(
      0
    );
  });
});
