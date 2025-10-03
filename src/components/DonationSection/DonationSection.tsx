import React, { useState } from 'react';
import Button from '../Button/Button';
import './DonationSection.css';

const DonationSection = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const presetAmounts = [100, 250, 500];

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
        </ul>
        <input
          type="number"
          min="1"
          placeholder="Вказати іншу сумму"
          onChange={e => setAmount(Number(e.target.value))}
          className="donation-input"
        />
        <Button variant="primary">Задонатити</Button>
      </form>
    </section>
  );
};

export default DonationSection;
