import { render, screen } from '@testing-library/react';
import HappyStoryCard from './HappyStoryCard';

describe('HappyStoryCard Component', () => {
    const mockProps = {
        src: 'test-image.jpg',
        name: 'John Doe',
        description: ['This is the first paragraph.', 'This is the second paragraph.'],
    };

    it('renders without crashing', () => {
        render(<HappyStoryCard {...mockProps} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('This is the first paragraph.')).toBeInTheDocument();
        expect(screen.getByText('This is the second paragraph.')).toBeInTheDocument();
    });

    it('renders the image with correct src attribute', () => {
        render(<HappyStoryCard {...mockProps} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'test-image.jpg');
    });

    it('renders the name as a heading', () => {
        render(<HappyStoryCard {...mockProps} />);
        const heading = screen.getByRole('heading', { name: /john doe/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders all paragraphs in the description', () => {
        render(<HappyStoryCard {...mockProps} />);
        mockProps.description.forEach((paragraph) => {
            expect(screen.getByText(paragraph)).toBeInTheDocument();
        });
    });
});