import type { Document } from 'src/types';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { DocumentItem } from './document-item';

// ----------------------------------------------------------------------

type Props = {
  doc: Document[];
  loadData: () => Promise<void>;
};

export function DocumentList({ doc, loadData }: Props) {
  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {doc.map((d) => (
          <DocumentItem key={d._id} document={d} loadDocuments={loadData} />
        ))}
      </Box>

      {doc.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 8, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
