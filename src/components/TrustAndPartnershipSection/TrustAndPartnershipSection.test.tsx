import { render, screen } from '@testing-library/react';
import TrustAndPartnershipSection from './TrustAndPartnershipSection';

jest.mock(
  '../../assets/images/cat_footprint-1.webp',
  () => 'footprint-right.webp'
);
jest.mock(
  '../../assets/images/cat_footprint-2.webp',
  () => 'footprint-bottom.webp'
);
jest.mock(
  '../../assets/images/cat_footprint-3.webp',
  () => 'footprint-left.webp'
);
jest.mock(
  '../../assets/images/cat_track_heart.webp',
  () => 'cat-track-heart.webp'
);
jest.mock('../../assets/images/dog_walking.webp', () => 'dog-walking.webp');
jest.mock('../../assets/images/cat_container.webp', () => 'cat-container.webp');
jest.mock('./TrustAndPartnershipSection.css', () => ({}));

describe('TrustAndPartnershipSection', () => {
  beforeEach(() => {
    render(<TrustAndPartnershipSection />);
  });

  it('renders the section title', () => {
    expect(
      screen.getByText('Любов і підтримка без усиновлення')
    ).toBeInTheDocument();
  });

  it('renders all SupportButton components with correct text', () => {
    expect(screen.getByText('Задонатити')).toBeInTheDocument();
    expect(
      screen.getByText('Волонтерство та допомога руками')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Допомога кормом або медикаментами')
    ).toBeInTheDocument();
  });

  it('renders all footprint images', () => {
    const footprints = screen.getAllByAltText('cat footprint');
    expect(footprints.length).toBe(3);
    expect(footprints[0]).toHaveAttribute('loading', 'lazy');
    expect(footprints[1]).toHaveAttribute('loading', 'lazy');
    expect(footprints[2]).toHaveAttribute('loading', 'lazy');
  });
});

jest.mock('../SupportButton/SupportButton', () => ({
  __esModule: true,
  default: ({
    imgSrc,
    altText,
    text,
    ariaLabel,
  }: {
    imgSrc: string;
    altText: string;
    text: string;
    ariaLabel: string;
  }) => (
    <button aria-label={ariaLabel}>
      <img src={imgSrc} alt={altText} />
      <h4>{text}</h4>
    </button>
  ),
}));
