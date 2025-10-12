import { render, screen } from '@testing-library/react';
import OurMission from './OurMission';

describe('OurMission Component', () => {
  test('перший абзац містить ключові частини тексту', () => {
    render(<OurMission />);

    const firstParagraph = document.querySelector(
      '.our-mission-text.first'
    ) as HTMLElement;
    expect(firstParagraph).toBeInTheDocument();

    expect(firstParagraph.textContent).toContain('Ми створили єдину платформу');

    // Перевірка жирного виділення
    const boldElements = firstParagraph.querySelectorAll('b');
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

    const boldElement = secondParagraph?.querySelector('b');
    expect(boldElement).toHaveTextContent('Adoptly');
  });

  test('містить зображення з alt текстом', () => {
    render(<OurMission />);
    const image = screen.getByAltText('pet and couple');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });
});
