import { render, screen } from '@testing-library/react';
import FAQAccordionSection from './FAQAccordionSection';

type AnswerItem =
  | { type: 'list'; content: string[] }
  | { type: 'text'; content: string };

interface AccordionItemProps {
  question: string;
  answer: string | AnswerItem[];
}

jest.mock(
  '../../components/AccordionItem/AccordionItem',
  () => (props: AccordionItemProps) => (
    <div data-testid="accordion-item">
      <h3>{props.question}</h3>
      <div>{typeof props.answer === 'string' ? props.answer : 'answer'}</div>
    </div>
  )
);

jest.mock('../../constants/FAQ_DATA', () => ({
  FAQ_DATA: [
    { id: 1, question: 'Питання 1', answer: 'Відповідь 1' },
    { id: 2, question: 'Питання 2', answer: 'Відповідь 2' },
  ],
}));

describe('FAQAccordionSection', () => {
  it('renders section and all FAQ items', () => {
    render(<FAQAccordionSection />);
    expect(screen.getByText('Часті запитання')).toBeInTheDocument();

    expect(screen.getByText('Питання 1')).toBeInTheDocument();
    expect(screen.getByText('Питання 2')).toBeInTheDocument();

    expect(screen.getByText('Відповідь 1')).toBeInTheDocument();
    expect(screen.getByText('Відповідь 2')).toBeInTheDocument();

    expect(screen.getAllByTestId('accordion-item')).toHaveLength(2);
  });
});
