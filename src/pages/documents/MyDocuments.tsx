import type { Document } from 'src/types';

import { z } from 'zod';
import React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Divider, Collapse, CardHeader, IconButton, Typography } from '@mui/material';

import { documentsAPI } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';

import { DocumentList } from 'src/sections/documents/document-list';

type inputFile = { files?: File[] };

const inputFileSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
});

const renderCollapseButton = (value: boolean, onToggle: () => void) => (
  <IconButton onClick={onToggle}>
    <Iconify icon={value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} />
  </IconButton>
);
const defaultValues: inputFile = { files: [] };

const MyDocuments = () => {
  const openDetails = useBoolean(true);

  const methods = useForm<inputFile>({
    resolver: zodResolver(inputFileSchema),
    defaultValues,
    values: defaultValues,
  });

  const { watch, setValue } = methods;

  const values = watch();

  const handleRemoveFile = React.useCallback(
    (inputFile: File | string) => {
      const filtered = values.files && values.files?.filter((file) => file !== inputFile);
      setValue('files', filtered);
    },
    [setValue, values.files]
  );

  const handleRemoveAllFiles = React.useCallback(() => {
    setValue('files', [], { shouldValidate: true });
  }, [setValue]);

  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [documentsLoading, setDocumentsLoading] = React.useState<boolean>(true);

  const loadDocuments = async () => {
    setDocumentsLoading(true);
    try {
      const res = await documentsAPI.getAll();
      setDocuments(res.data);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setDocumentsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!values.files || values.files.length === 0) {
      toast.error('No files selected for upload.');
      return;
    }

    const sumSize = values.files.reduce((acc, file) => acc + file.size, 0);

    if (sumSize > 10485760) {
      toast.error('Total file size exceeds 10MB. Please select smaller files.');
      return;
    }

    setDocumentsLoading(true);
    try {
      await documentsAPI.upload(values.files, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          console.log(`Upload Progress: ${progress}%`);
        },
      });
      handleRemoveAllFiles();
      loadDocuments();
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setDocumentsLoading(false);
    }
  };

  React.useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        My Documents
      </Typography>

      <Stack
        spacing={{ xs: 3, md: 5 }}
        sx={{ mx: 'auto', width: '100%', maxWidth: { xs: 720, lg: 880 } }}
      >
        <Form methods={methods} onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <Card>
            <CardHeader
              title="Upload Document"
              action={renderCollapseButton(openDetails.value, openDetails.onToggle)}
              sx={{ mb: 3 }}
            />
            <Collapse in={openDetails.value}>
              <Divider />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Field.Upload
                  multiple
                  name="files"
                  maxSize={3145728}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={handleUpload}
                  value={values.files}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                      '.docx',
                    ],
                    'text/plain': ['.txt'],
                  }}
                  maxFiles={3}
                />
              </Stack>
            </Collapse>
          </Card>
        </Form>
      </Stack>

      <Typography variant="h6" sx={{ my: { xs: 3, md: 5 } }}>
        Documents List
      </Typography>
      {documentsLoading && <LoadingScreen sx={{ pb: 7 }} />}
      {!documents.length && !documentsLoading ? <EmptyContent filled sx={{ py: 10 }} /> : null}
      {!!documents.length && !documentsLoading ? (
        <DocumentList doc={documents} loadData={loadDocuments} />
      ) : null}
    </DashboardContent>
  );
};

export default MyDocuments;
