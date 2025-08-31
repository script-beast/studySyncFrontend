import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';

import { _mock } from 'src/_mock';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

type Props = CardProps & {};

export function FillerImage({ sx, ...other }: Props) {
  return (
    <Card
      sx={[
        () => ({
          borderRadius: 2,
          boxShadow: 'none',
          display: { xs: 'none', md: 'block' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Image
        alt="Quiz Background"
        src={_mock.image.cover(Math.floor(Math.random() * 23) + 1)}
        sx={{ height: 1, borderRadius: 1.5 }}
      />
    </Card>
  );
}
