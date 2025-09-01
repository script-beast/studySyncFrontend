import type { QuizResult } from 'src/types';
import type { UseNavCollapseReturn } from './hooks/use-collapse-nav';

import { useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { ToggleButton } from './styles';
import { QuizNavItem } from './quiz-nav-item';

// ----------------------------------------------------------------------

const NAV_WIDTH = 320;

const NAV_COLLAPSE_WIDTH = 96;

type Props = {
  selectedId: number;
  collapseNav: UseNavCollapseReturn;
  quiz: QuizResult[];
  handleChangeQuestion: (index: number) => void;
  isResult?: boolean;
};

export function QuizNav({ collapseNav, quiz, selectedId, handleChangeQuestion, isResult }: Props) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const {
    openMobile,
    onOpenMobile,
    onCloseMobile,
    onCloseDesktop,
    collapseDesktop,
    onCollapseDesktop,
  } = collapseNav;

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
  }, [mdUp, onCloseMobile, onCollapseDesktop]);

  const renderList = () => (
    <nav>
      <Box component="ul">
        {quiz.map((item, idx) => (
          <QuizNavItem
            key={item._id}
            collapse={collapseDesktop}
            quiz={item}
            selected={idx === selectedId}
            onCloseMobile={onCloseMobile}
            idx={quiz.indexOf(item)}
            handleChangeQuestion={handleChangeQuestion}
            isResult={isResult}
          />
        ))}
      </Box>
    </nav>
  );

  const renderContent = () => (
    <>
      <Box
        sx={{
          pt: 2.5,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        {!collapseDesktop && (
          <>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Questions
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={collapseDesktop ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>
      </Box>

      <Scrollbar sx={{ pb: 1 }}>{renderList()}</Scrollbar>
    </>
  );

  return (
    <>
      <ToggleButton onClick={onOpenMobile} sx={{ display: { md: 'none' } }}>
        <Iconify width={16} icon="eva:arrow-ios-forward-fill" />
      </ToggleButton>

      <Box
        sx={[
          (theme) => ({
            minHeight: 0,
            flex: '1 1 auto',
            width: NAV_WIDTH,
            flexDirection: 'column',
            display: { xs: 'none', md: 'flex' },
            borderRight: `solid 1px ${theme.vars.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && { width: NAV_COLLAPSE_WIDTH }),
          }),
        ]}
      >
        {renderContent()}
      </Box>

      <Drawer
        open={openMobile}
        onClose={onCloseMobile}
        slotProps={{
          backdrop: { invisible: true },
          paper: { sx: { width: NAV_WIDTH } },
        }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
}
