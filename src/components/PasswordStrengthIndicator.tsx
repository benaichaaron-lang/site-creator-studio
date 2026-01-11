import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const { t } = useLanguage();

  const strength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    
    // Length checks
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Normalize to 0-4 scale
    const normalizedScore = Math.min(4, Math.floor(score / 1.75));

    const levels = [
      { label: t('passwordStrength.weak'), color: 'bg-red-500' },
      { label: t('passwordStrength.fair'), color: 'bg-orange-500' },
      { label: t('passwordStrength.good'), color: 'bg-yellow-500' },
      { label: t('passwordStrength.strong'), color: 'bg-green-500' },
      { label: t('passwordStrength.veryStrong'), color: 'bg-emerald-500' },
    ];

    return {
      score: normalizedScore,
      label: levels[normalizedScore].label,
      color: levels[normalizedScore].color,
    };
  }, [password, t]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index <= strength.score ? strength.color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        strength.score <= 1 ? 'text-red-500' : 
        strength.score === 2 ? 'text-yellow-500' : 
        'text-green-500'
      }`}>
        {strength.label}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
