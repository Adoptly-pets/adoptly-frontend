import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './DonationSection.css';

const DonationSection = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [placeholderText, setPlaceholderText] = useState('Вказати іншу суму');
  const presetAmounts = [100, 250, 500];

  const updatePlaceholderText = () => {
    if (window.innerWidth < 768) {
      setPlaceholderText('Інша сума');
    } else {
      setPlaceholderText('Вказати іншу суму');
    }
  };

  useEffect(() => {
    updatePlaceholderText();
    window.addEventListener('resize', updatePlaceholderText);
    return () => window.removeEventListener('resize', updatePlaceholderText);
  }, []);

  const handleSelect = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Донат відправлено: ${amount}`);
  };

  return (
    <section className="donation-section">
      <h2>
        Бажаєш підтримати тварин без усиновлення ? <br />
        <span>Обери суму свого донату</span>
      </h2>
      <form className="donation-form" onSubmit={handleSubmit}>
        <ul>
          {presetAmounts.map(val => (
            <li key={val}>
              <button type="button" onClick={() => handleSelect(val)}>
                {val} грн
              </button>
            </li>
          ))}
          <input
            type="number"
            min="1"
            placeholder={placeholderText}
            onChange={e => setAmount(Number(e.target.value))}
            className="donation-input"
          />
        </ul>
        <Button variant="primary" maxWidth={396} maxWidthMobile={220}>
          Задонатити
        </Button>
      </form>
    </section>
  );
};

export default DonationSection;
