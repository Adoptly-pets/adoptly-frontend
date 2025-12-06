import { render, screen } from '@testing-library/react';
import BenefitBlock from './BenefitBlock';

describe('BenefitBlock Component', () => {
  it('should render correctly', () => {
    render(
      <BenefitBlock image="test.jpg" title="Title test" text="Text test" />
    );

    expect(document.querySelector('.benefit-block')).toBeInTheDocument();
    expect(screen.getByText('Title test')).toBeInTheDocument();
    expect(screen.getByText('Text test')).toBeInTheDocument();
    const img = screen.getByAltText('Title test');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
