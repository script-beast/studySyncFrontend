import type { Theme, SxProps } from '@mui/material/styles';

import React from 'react';

import { Box, Chip, Typography } from '@mui/material';

import { fDuration, fDurationMinSec } from 'src/utils/format-time';

// ----------------------------------------------------------------------

interface TimerDisplayProps {
  /** Elapsed time in seconds */
  elapsedSeconds: number;
  /** Remaining time in seconds (optional, for countdown mode) */
  remainingSeconds?: number;
  /** Display format */
  format?: 'digital' | 'short' | 'minimal';
  /** Timer variant */
  variant?: 'elapsed' | 'remaining' | 'both';
  /** Color when time is running normally */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Color when time is critical (last 10% of time limit) */
  criticalColor?: 'warning' | 'error';
  /** Time limit for calculating critical state */
  timeLimit?: number;
  /** Show as chip instead of text */
  chip?: boolean;
  /** Custom styling */
  sx?: SxProps<Theme>;
  /** Label to show before timer */
  label?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
}

export function TimerDisplay({
  elapsedSeconds,
  remainingSeconds = 0,
  format = 'digital',
  variant = 'elapsed',
  color = 'primary',
  criticalColor = 'error',
  timeLimit = 0,
  chip = false,
  sx,
  label,
  size = 'medium',
}: TimerDisplayProps) {
  // Determine if we're in critical time (last 10% or less than 1 minute)
  const isCritical = React.useMemo(() => {
    if (variant === 'remaining' && timeLimit > 0) {
      const criticalThreshold = Math.min(timeLimit * 0.1, 60); // 10% or 1 minute, whichever is smaller
      return remainingSeconds <= criticalThreshold && remainingSeconds > 0;
    }
    return false;
  }, [variant, timeLimit, remainingSeconds]);

  const currentColor = isCritical ? criticalColor : color;

  // Format time based on variant and format
  const formatTime = (seconds: number) => {
    if (format === 'minimal') {
      return fDurationMinSec(seconds);
    }
    return fDuration(seconds, format === 'digital' ? 'digital' : 'short');
  };

  const getDisplayText = () => {
    switch (variant) {
      case 'remaining':
        return formatTime(remainingSeconds);
      case 'both':
        return `${formatTime(elapsedSeconds)} / ${formatTime(remainingSeconds)}`;
      case 'elapsed':
      default:
        return formatTime(elapsedSeconds);
    }
  };

  const displayText = getDisplayText();
  const fullText = label ? `${label}: ${displayText}` : displayText;

  // Typography variant based on size
  const getTypographyVariant = () => {
    switch (size) {
      case 'small':
        return 'body2';
      case 'large':
        return 'h6';
      case 'medium':
      default:
        return 'body1';
    }
  };

  if (chip) {
    return (
      <Chip
        label={fullText}
        color={currentColor}
        variant="outlined"
        size={size === 'large' ? 'medium' : 'small'}
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          ...sx,
        }}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      {label && (
        <Typography variant={getTypographyVariant()} color="text.secondary">
          {label}:
        </Typography>
      )}
      <Typography
        variant={getTypographyVariant()}
        color={`${currentColor}.main`}
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          ...(isCritical && {
            animation: 'pulse 1s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.5 },
              '100%': { opacity: 1 },
            },
          }),
        }}
      >
        {displayText}
      </Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface QuizTimerProps {
  /** Elapsed time in seconds */
  elapsedSeconds: number;
  /** Whether timer is running */
  isRunning: boolean;
  /** Remaining time in seconds (for countdown mode) */
  remainingSeconds?: number;
  /** Time limit in seconds */
  timeLimit?: number;
  /** Show start/pause controls */
  showControls?: boolean;
  /** Callbacks for timer control */
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  /** Display variant */
  variant?: 'elapsed' | 'remaining' | 'both';
  /** Custom styling */
  sx?: SxProps<Theme>;
}

export function QuizTimer({
  elapsedSeconds,
  isRunning,
  remainingSeconds = 0,
  timeLimit = 0,
  variant = 'elapsed',
  sx,
}: QuizTimerProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ...sx }}>
      <TimerDisplay
        elapsedSeconds={elapsedSeconds}
        remainingSeconds={remainingSeconds}
        timeLimit={timeLimit}
        variant={variant}
        format="minimal"
        color="primary"
        criticalColor="error"
        chip
        size="large"
      />
      {!isRunning && elapsedSeconds > 0 && (
        <Chip label="Paused" color="warning" variant="outlined" size="small" />
      )}
    </Box>
  );
}
