import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  icon: React.ReactElement;
};

export function StatsBoxes({ title, total, icon, sx, ...other }: Props) {
  return (
    <Card
      sx={[
        () => ({
          p: 2,
          pl: 3,
          display: 'flex',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>

        <Box sx={{ my: 1.5, typography: 'h3' }}>{total}</Box>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          display: 'flex',
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
