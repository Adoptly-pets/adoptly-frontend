import { render, screen } from '@testing-library/react';
import GuideCard from './GuideCard';

describe('GuideCard Component', () => {
    const mockProps = {
        cardImgSrc: 'test-image.jpg',
        cardImgAlt: 'Test Image',
        cardNumber: '1',
        cardStep: 'Step 1',
        cardDescription: [
            { text: 'This is a ', bold: false },
            { text: 'bold', bold: true },
            { text: ' description.', bold: false },
        ],
    };

    it('renders without crashing', () => {
        render(<GuideCard {...mockProps} />);
        expect(screen.getByRole('img', { name: /test image/i })).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders the image with correct src and alt attributes', () => {
        render(<GuideCard {...mockProps} />);
        const img = screen.getByRole('img', { name: /test image/i });
        expect(img).toHaveAttribute('src', 'test-image.jpg');
        expect(img).toHaveAttribute('alt', 'Test Image');
    });

    it('renders the card number and step', () => {
        render(<GuideCard {...mockProps} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders the description with bold and non-bold text', () => {
        render(<GuideCard {...mockProps} />);
        const boldText = screen.getByText('bold');
        const fullText = screen.getByText((_, element) => {
            return element?.textContent === 'This is a bold description.';
        });

        expect(boldText.tagName).toBe('STRONG');
        expect(fullText.tagName).toBe('P');
    });

    it('does not render if cardDescription is empty', () => {
        const emptyDescriptionProps = { ...mockProps, cardDescription: [] };
        const { container } = render(<GuideCard {...emptyDescriptionProps} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders default alt text if cardImgAlt is not provided', () => {
        const noAltProps = { ...mockProps, cardImgAlt: '' };
        render(<GuideCard {...noAltProps} />);
        const img = screen.getByRole('img', { name: /guide card image/i });
        expect(img).toHaveAttribute('alt', 'Guide card image');
    });
});