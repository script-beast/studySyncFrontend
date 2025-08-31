import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void;
  // filters: UseSetStateReturn<IQuizTableFilters>;
  options: {
    roles: string[];
  };
};

export function QuizTableToolbar({ options, onResetPage }: Props) {
  // const { state: currentFilters, setState: updateFilters } = filters;

  // const handleFilterName = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     onResetPage();
  //     updateFilters({ name: event.target.value });
  //   },
  //   [onResetPage, updateFilters]
  // );

  // const handleFilterRole = useCallback(
  //   (event: SelectChangeEvent<string[]>) => {
  //     const newValue =
  //       typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

  //     onResetPage();
  //     updateFilters({ role: newValue });
  //   },
  //   [onResetPage, updateFilters]
  // );

  return (
    <Box
      sx={{
        p: 2.5,
        gap: 2,
        display: 'flex',
        pr: { xs: 2.5, md: 1 },
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-end', md: 'center' },
      }}
    >
      <FormControl sx={{ width: { xs: 1, md: 600 } }}>
        <InputLabel htmlFor="filter-document-select">Document</InputLabel>
        <Select
          multiple
          // value={currentFilters.role}
          // onChange={handleFilterRole}
          input={<OutlinedInput label="Document" />}
          // renderValue={(selected) => selected.map((value) => value).join(', ')}
          inputProps={{ id: 'filter-document-select' }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
        >
          {options.roles.map((option) => (
            <MenuItem key={option} value={option}>
              {/* <Checkbox disableRipple size="small" checked={currentFilters.role.includes(option)} /> */}
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          gap: 2,
          width: 1,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          // value={currentFilters.name}
          // onChange={handleFilterName}
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
