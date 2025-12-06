import { render, screen } from '@testing-library/react';
import AccordionItem from './AccordionItem';
import userEvent from '@testing-library/user-event';

jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  Icon: () => <span data-testid="icon-mock" />,
}));

describe('AccordionItem Component', () => {
  it('render AccordionItem component', async () => {
    render(<AccordionItem question="Some question" answer="Some answer" />);
    expect(screen.getByText('Some question')).toBeInTheDocument();
    expect(screen.queryByText('Some answer')).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /Some question/i })
    );
    expect(await screen.findByText('Some answer')).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /Some question/i })
    );
    expect(await screen.queryByText('Some answer')).not.toBeInTheDocument();
  });
});
