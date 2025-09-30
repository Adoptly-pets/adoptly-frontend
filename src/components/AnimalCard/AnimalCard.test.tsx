import { render, screen } from '@testing-library/react';
import AnimalCard from './AnimalCard';

jest.mock('../Icon/Icon.tsx', () => ({
  Icon: ({ id }: { id: string }) => <span data-testid={id}></span>,
}));

const mockAnimal = {
  id: 1,
  name: 'Lucky',
  age: '2 month',
  gender: 'male' as const,
  image: '/lucky.web',
  description: 'A very playful and cheerful dog',
};

describe('AnimalCard Component', () => {
  it('renders the animal name, age, description and image', () => {
    render(<AnimalCard animal={mockAnimal} />);

    //image
    const img = screen.getByRole('img', { name: /lucky/i });
    expect(img).toHaveAttribute('src', '/lucky.web');
    //name
    expect(screen.getByText('Lucky')).toBeInTheDocument();

    //age
    expect(screen.getByText('2 month')).toBeInTheDocument();

    //description
    expect(screen.getByText(/playful and cheerful dog/i)).toBeInTheDocument();
  });

  it('has a favourite button witt correct aria-label', () => {
    render(<AnimalCard animal={mockAnimal} />);

    const favBtn = screen.getByRole('button', {
      name: /favourite lucky/i,
    });
    expect(favBtn).toBeInTheDocument();
  });

  it('render the genger icon', () => {
    render(<AnimalCard animal={mockAnimal} />);
    expect(screen.getByTestId('icon-gender')).toBeInTheDocument();
  });
});
