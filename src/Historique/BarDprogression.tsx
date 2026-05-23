import React, { useMemo } from 'react';

/* ================== TYPES ================== */

type ProgressVariant = 'default' | 'compact' | 'detailed' | 'minimal';
type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressStatus = 'idle' | 'loading' | 'success' | 'warning' | 'error';

interface ProgressBarProps {
  // Basique
  label: string;
  percentage: number;
  color?: string;
  gradient?: string;

  // Avancé
  variant?: ProgressVariant;
  size?: ProgressSize;
  status?: ProgressStatus;
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
  rounded?: boolean;
  maxValue?: number;
  subLabel?: string;
  icon?: React.ReactNode;
  onComplete?: () => void;
  className?: string;
}

/* ================== CONSTANTES ================== */

const STATUS_COLORS = {
  idle: '#94a3b8',
  loading: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const SIZE_MAP = {
  sm: { height: 'h-1', text: 'text-xs' },
  md: { height: 'h-2', text: 'text-sm' },
  lg: { height: 'h-3', text: 'text-base' },
};

const VARIANT_SPACING = {
  default: 'mb-3',
  compact: 'mb-2',
  detailed: 'mb-4',
  minimal: 'mb-1',
};

/* ================== UTILITAIRES ================== */

/**
 * Valide et nettoie le pourcentage
 */
const clampPercentage = (value: number, maxValue: number = 100): number => {
  return Math.min(maxValue, Math.max(0, value));
};

/**
 * Génère un gradient automatiquement basé sur la couleur
 */
const generateGradient = (color: string): string => {
  if (color.startsWith('rgb')) {
    return `linear-gradient(90deg, ${color}, ${color}dd)`;
  }
  return `linear-gradient(90deg, ${color}, ${color}ee)`;
};

/**
 * Obtient la couleur basée sur le statut ou le pourcentage
 */
const getStatusColor = (
  status?: ProgressStatus,
  percentage?: number,
  customColor?: string
): string => {
  if (status && status !== 'idle') {
    return STATUS_COLORS[status];
  }

  if (customColor) {
    return customColor;
  }

  if (percentage !== undefined) {
    if (percentage === 100) return STATUS_COLORS.success;
    if (percentage >= 75) return STATUS_COLORS.idle;
    if (percentage >= 50) return STATUS_COLORS.loading;
    if (percentage >= 25) return STATUS_COLORS.warning;
    return STATUS_COLORS.error;
  }

  return STATUS_COLORS.idle;
};

/**
 * Formate le pourcentage avec décimales optionnelles
 */
const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

/* ================== COMPOSANT PRINCIPAL ================== */

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      label,
      percentage,
      color,
      gradient,
      variant = 'default',
      size = 'md',
      status,
      showPercentage = true,
      animated = true,
      striped = false,
      rounded = true,
      maxValue = 100,
      subLabel,
      icon,
      onComplete,
      className = '',
    },
    ref
  ) => {
    // Calculs
    const safePercentage = useMemo(
      () => clampPercentage(percentage, maxValue),
      [percentage, maxValue]
    );

    const displayColor = useMemo(
      () => getStatusColor(status, safePercentage, color),
      [status, safePercentage, color]
    );

    const displayGradient = useMemo(
      () => gradient || generateGradient(displayColor),
      [gradient, displayColor]
    );

    const sizeClass = useMemo(() => SIZE_MAP[size], [size]);
    const spacingClass = useMemo(() => VARIANT_SPACING[variant], [variant]);

    // Effet si complété
    React.useEffect(() => {
      if (safePercentage === 100 && onComplete) {
        onComplete();
      }
    }, [safePercentage, onComplete]);

    // Variants
    if (variant === 'minimal') {
      return (
        <div ref={ref} className={`${spacingClass} ${className}`}>
          <div className={`w-full ${sizeClass.height} bg-slate-200 rounded-full overflow-hidden`}>
            <div
              className={`h-full transition-all ${animated ? 'duration-500' : ''} ${
                striped ? 'bg-striped' : ''
              }`}
              style={{
                width: `${safePercentage}%`,
                background: displayGradient,
              }}
              role="progressbar"
              aria-valuenow={safePercentage}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={label}
            />
          </div>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div ref={ref} className={`${spacingClass} ${className}`}>
          <div className="flex items-center justify-between gap-2">
            <span className={`font-medium text-slate-700 ${sizeClass.text}`}>
              {label}
            </span>
            {showPercentage && (
              <span
                className={`font-bold ${sizeClass.text}`}
                style={{ color: displayColor }}
              >
                {formatPercentage(safePercentage)}
              </span>
            )}
          </div>
          <div className={`w-full ${sizeClass.height} bg-slate-200 rounded-full overflow-hidden mt-1`}>
            <div
              className={`h-full transition-all ${animated ? 'duration-500' : ''}`}
              style={{
                width: `${safePercentage}%`,
                background: displayGradient,
              }}
              role="progressbar"
              aria-valuenow={safePercentage}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={label}
            />
          </div>
        </div>
      );
    }

    if (variant === 'detailed') {
      return (
        <div ref={ref} className={`${spacingClass} p-4 bg-slate-50 dark:bg-slate-800 rounded-lg ${className}`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {icon && <span className="text-lg">{icon}</span>}
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{label}</p>
                {subLabel && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {subLabel}
                  </p>
                )}
              </div>
            </div>
            {showPercentage && (
              <span
                className="font-bold text-lg"
                style={{ color: displayColor }}
              >
                {formatPercentage(safePercentage)}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className={`w-full ${sizeClass.height} bg-slate-200 dark:bg-slate-700 ${rounded ? 'rounded-full' : 'rounded'} overflow-hidden`}>
            <div
              className={`h-full transition-all ${animated ? 'duration-500' : ''} ${
                striped ? 'bg-striped' : ''
              }`}
              style={{
                width: `${safePercentage}%`,
                background: displayGradient,
              }}
              role="progressbar"
              aria-valuenow={safePercentage}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={label}
            />
          </div>

          {/* Footer avec stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <p className="text-slate-500 dark:text-slate-500">Complété</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                {formatPercentage(safePercentage)}
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-500">Restant</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                {formatPercentage(maxValue - safePercentage)}
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-500">Statut</p>
              <p className="font-semibold" style={{ color: displayColor }}>
                {safePercentage === 100 ? '✓ Done' : 'En cours'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Variant default
    return (
      <div ref={ref} className={`${spacingClass} ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-base">{icon}</span>}
            <span className={`font-semibold text-slate-700 dark:text-slate-300 ${sizeClass.text}`}>
              {label}
            </span>
          </div>
          {showPercentage && (
            <span
              className={`font-bold ${sizeClass.text}`}
              style={{ color: displayColor }}
            >
              {formatPercentage(safePercentage)}
            </span>
          )}
        </div>

        {/* Sublabel optionnel */}
        {subLabel && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            {subLabel}
          </p>
        )}

        {/* Progress bar */}
        <div
          className={`w-full ${sizeClass.height} bg-slate-200 dark:bg-slate-700 ${
            rounded ? 'rounded-full' : 'rounded'
          } overflow-hidden`}
        >
          <div
            className={`h-full transition-all ${animated ? 'duration-500' : ''} ${
              striped ? 'bg-striped' : ''
            }`}
            style={{
              width: `${safePercentage}%`,
              background: displayGradient,
            }}
            role="progressbar"
            aria-valuenow={safePercentage}
            aria-valuemin={0}
            aria-valuemax={maxValue}
            aria-label={label}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

/* ================== COMPOSANT SEGMENTÉ (BONUS) ================== */

interface ProgressBarSegmentedProps {
  label: string;
  segments: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  total?: number;
}

/**
 * Progress bar segmenté pour montrer plusieurs catégories
 */
export const ProgressBarSegmented: React.FC<ProgressBarSegmentedProps> = ({
  label,
  segments,
  total = 100,
}) => {
  return (
    <div className="mb-3">
      <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">
        {label}
      </p>

      <div className="flex h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden gap-0.5">
        {segments.map((segment, idx) => (
          <div
            key={idx}
            className="h-full transition-all"
            style={{
              width: `${(segment.value / total) * 100}%`,
              background: segment.color,
            }}
            title={`${segment.label}: ${segment.value}`}
            role="progressbar"
            aria-valuenow={segment.value}
            aria-valuemax={total}
            aria-label={`${label} - ${segment.label}`}
          />
        ))}
      </div>

      {/* Légende */}
      <div className="flex gap-4 mt-2 text-xs text-slate-600 dark:text-slate-400">
        {segments.map((segment, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: segment.color }}
            />
            <span>{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ================== STYLES GLOBAUX ================== */

export const ProgressBarStyles = `
  .bg-striped {
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.15) 10px,
      rgba(255, 255, 255, 0.15) 20px
    );
    animation: stripeAnimation 1s linear infinite;
  }

  @keyframes stripeAnimation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bg-striped {
      animation: none;
    }
  }
`;