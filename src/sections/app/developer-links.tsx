import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
};

const list = [
  {
    label: 'GitHub',
    link: 'https://github.com/script-beast',
    icon: <Iconify width={32} icon="socials:github" />,
  },
  {
    label: 'Linkedin',
    link: 'https://www.linkedin.com/in/aprajapati028/',
    icon: <Iconify width={32} icon="socials:linkedin" />,
  },
  {
    label: 'Leetcode',
    link: 'https://leetcode.com/u/Ankitkp028/',
    icon: <Iconify width={32} icon="solar:code-bold" />,
  },
  {
    label: 'Google',
    link: 'mailto:ankitkp0128@gmail.com',
    icon: <Iconify width={32} icon="socials:google" />,
  },
];

export function DeveloperLinks({ title, subheader, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box
        sx={{
          p: 3,
          gap: 2,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        }}
      >
        {list.map((site) => (
          <Box
            key={site.label}
            sx={(theme) => ({
              py: 2.5,
              display: 'flex',
              borderRadius: 1.5,
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
              textDecoration: 'none',
            })}
            component="a"
            href={site.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.icon}

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {site.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
