import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import './PasswordStrengthBar.css';

let isInitialized = false;

const initZxcvbn = () => {
  if (isInitialized) return;
  zxcvbnOptions.setOptions({
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
  });
  isInitialized = true;
};

const SEGMENTS_BY_SCORE = [0, 1, 2, 3, 3];

interface PasswordStrengthBarProps {
  password: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  password,
}) => {
  const { t } = useTranslation();
  const result = useMemo(() => {
    if (!password) return null;
    initZxcvbn();
    return zxcvbn(password);
  }, [password]);

  const strengthConfig = useMemo(
    () => [
      { label: t('passwordStrength.weak'), className: 'strength-weak' },
      { label: t('passwordStrength.weak'), className: 'strength-weak' },
      { label: t('passwordStrength.medium'), className: 'strength-medium' },
      { label: t('passwordStrength.strong'), className: 'strength-strong' },
      { label: t('passwordStrength.strong'), className: 'strength-strong' },
    ],
    [t]
  );

  if (!result) return null;

  const { label, className } = strengthConfig[result.score];
  const filledSegments = SEGMENTS_BY_SCORE[result.score];

  return (
    <div
      className="password-strength"
      role="meter"
      aria-valuenow={result.score}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-valuetext={label}
      aria-live="polite"
    >
      <div className="password-strength-bar">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`password-strength-segment${i < filledSegments ? ` ${className}` : ''}`}
          />
        ))}
      </div>
      <span className={`password-strength-label ${className}`}>{label}</span>
    </div>
  );
};

export default PasswordStrengthBar;
