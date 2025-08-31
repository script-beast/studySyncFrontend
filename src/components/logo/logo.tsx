import type { LinkProps } from '@mui/material/Link';

import { useId } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export function Logo({
  sx,
  disabled,
  className,
  href = '/',
  isSingle = true,
  ...other
}: LogoProps) {
  const theme = useTheme();

  const uniqueId = useId();

  const TEXT_PRIMARY = theme.vars.palette.text.primary;
  const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  // ---------- SINGLE LOGO (Stylized "S" with multiple shapes) ----------
  const singleLogo = (
    <svg width="100%" height="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id={`${uniqueId}-1`}
          x1="120"
          y1="140"
          x2="250"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}-2`}
          x1="140"
          y1="220"
          x2="360"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}-3`}
          x1="300"
          y1="320"
          x2="440"
          y2="420"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>

      {/* Top curve of S */}
      <path
        d="M120 180C180 120 320 120 380 180C420 220 360 260 300 250C240 240 180 220 120 260Z"
        fill={`url(#${uniqueId}-1)`}
      />

      {/* Middle connection */}
      <path
        d="M140 280C200 240 300 280 360 300C400 320 360 360 300 360C240 360 200 340 140 320Z"
        fill={`url(#${uniqueId}-2)`}
      />

      {/* Bottom curve of S */}
      <path
        d="M200 360C260 400 380 400 420 360C460 320 400 280 320 300C260 320 240 340 200 360Z"
        fill={`url(#${uniqueId}-3)`}
      />
    </svg>
  );

  // ---------- FULL LOGO (S + Wordmark) ----------
  const fullLogo = (
    <svg width="100%" height="100%" viewBox="0 0 360 128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id={`${uniqueId}-1`}
          x1="20"
          y1="40"
          x2="120"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}-2`}
          x1="40"
          y1="60"
          x2="140"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}-3`}
          x1="60"
          y1="80"
          x2="160"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>

      {/* Stylized S with 3 paths */}
      <path
        d="M40 60C70 30 130 30 160 60C190 90 130 110 90 100C60 90 50 80 40 100Z"
        fill={`url(#${uniqueId}-1)`}
      />
      <path
        d="M50 90C90 70 150 90 180 100C200 110 180 130 150 130C120 130 90 120 50 110Z"
        fill={`url(#${uniqueId}-2)`}
      />
      <path
        d="M80 110C120 140 200 140 220 120C240 100 200 90 160 100C130 110 100 120 80 110Z"
        fill={`url(#${uniqueId}-3)`}
      />

      {/* Brand text */}
      <text
        x="260"
        y="88"
        fill={TEXT_PRIMARY}
        fontSize="42"
        fontFamily="sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        Brand
      </text>
    </svg>
  );

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: 40,
          height: 40,
          ...(!isSingle && { width: 160, height: 60 }),
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
