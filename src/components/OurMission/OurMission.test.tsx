import { render, screen } from '@testing-library/react';
import OurMission from './OurMission';
import { JSX } from 'react';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'ourMission.title': 'Наша мета',
      };
      return translations[key] || key;
    },
    i18n: { language: 'uk' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => {
    const translations: Record<string, JSX.Element> = {
      'ourMission.paragraph1': (
        <>
          Ми створили{' '}
          <strong>єдину платформу, яка об’єднує всі притулки України,</strong>{' '}
          щоб жодна тварина не залишилася без шансів на щасливе життя.
        </>
      ),
      'ourMission.paragraph2': (
        <>
          {' '}
          <strong>Adoptly</strong> надихає ділитися любов’ю, розповідає історії
          щасливих усиновлень і дає можливість кожному зробити добру справу.
        </>
      ),
    };
    return translations[i18nKey] || <>{i18nKey}</>;
  },
}));
describe('OurMission Component', () => {
  test('перший абзац містить ключові частини тексту', () => {
    render(<OurMission />);

    const firstParagraph = document.querySelector(
      '.our-mission-text.first'
    ) as HTMLElement;
    expect(firstParagraph).toBeInTheDocument();

    expect(firstParagraph.textContent).toContain('Ми створили єдину платформу');

    // Перевірка жирного виділення
    const boldElements = firstParagraph.querySelectorAll('strong');
    expect(boldElements.length).toBeGreaterThan(0);
    expect(boldElements[0]).toHaveTextContent(
      'єдину платформу, яка об’єднує всі притулки України,'
    );
  });

  test('другий абзац містить текст з "Adoptly"', () => {
    render(<OurMission />);

    // Шукаємо другий абзац за класом
    const secondParagraph = document.querySelector('.our-mission-text.second');
    expect(secondParagraph).toBeInTheDocument();

    const boldElement = secondParagraph?.querySelector('strong');
    expect(boldElement).toHaveTextContent('Adoptly');
  });

  test('містить зображення з alt текстом', () => {
    render(<OurMission />);
    const image = screen.getByAltText('pet and couple');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });
});
