import { CircularProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const LoadingPage: FC = () => {
  return (
    <Stack
      sx={{
        height: '100dvh',
        width: '100dvw',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Loading...
      </Typography>
      <CircularProgress color="primary" />
    </Stack>
  );
};
