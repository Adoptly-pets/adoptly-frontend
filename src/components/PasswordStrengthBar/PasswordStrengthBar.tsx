import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import './PasswordStrengthBar.css';

zxcvbnOptions.setOptions({
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
});

interface PasswordStrengthBarProps {
  password: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  password,
}) => {
  const { t } = useTranslation();

  const result = useMemo(() => zxcvbn(password), [password]);

  const strengthConfig = [
    { label: t('passwordStrength.weak'), className: 'strength-weak' },
    { label: t('passwordStrength.weak'), className: 'strength-weak' },
    { label: t('passwordStrength.medium'), className: 'strength-medium' },
    { label: t('passwordStrength.strong'), className: 'strength-strong' },
    { label: t('passwordStrength.strong'), className: 'strength-strong' },
  ];

  const { label, className } = strengthConfig[result.score];
  const segmentCount = 3;
  const filledSegments =
    result.score === 0 ? 0 : result.score <= 1 ? 1 : result.score <= 2 ? 2 : 3;

  if (!password) return null;

  return (
    <div className="password-strength" aria-live="polite">
      <div className="password-strength-bar">
        {Array.from({ length: segmentCount }, (_, i) => (
          <div
            key={i}
            className={`password-strength-segment ${i < filledSegments ? className : ''}`}
          />
        ))}
      </div>
      <span className={`password-strength-label ${className}`}>{label}</span>
    </div>
  );
};

export default PasswordStrengthBar;
