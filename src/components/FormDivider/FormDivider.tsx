import React from 'react';
import './FormDivider.css';

interface FormDividerProps {
  text: string;
}

const FormDivider: React.FC<FormDividerProps> = ({ text }) => {
  return (
    <div className="form-divider" aria-hidden="true">
      <span className="form-divider-text">{text}</span>
    </div>
  );
};

export default FormDivider;
