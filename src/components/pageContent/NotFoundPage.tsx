import { Stack, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  const router = useNavigate();

  const handleBackHomeClick = (): void => {
    router('/');
  };

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
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        指定されたページは存在しません
      </Typography>
      <Button onClick={handleBackHomeClick} variant="outlined">
        トップに戻る
      </Button>
    </Stack>
  );
};
