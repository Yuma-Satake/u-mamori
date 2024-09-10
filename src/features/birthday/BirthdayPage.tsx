/* eslint-disable jsx-a11y/control-has-associated-label */
import { Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

export const BirthdayPage: FC = () => {
  const maxImgNumber = 3;
  const [targetImageNumber, setTargetImageNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetImageNumber((prev) => {
        if (prev + 1 === maxImgNumber) return 0;
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setTargetImageNumber((prev) => {
            if (prev + 1 === maxImgNumber) return 0;
            return prev + 1;
          });
        }}
        style={{
          border: 'none',
        }}
      >
        <Stack
          sx={{
            height: '100dvh',
            width: '100dvw',
            backgroundImage: `url(/momo/momo_${targetImageNumber}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s ease-in-out',
          }}
        />
      </button>
      <Typography
        variant="caption"
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 15,
          fontSize: 10,
          fontFamily: 'Yomogi, cursive',
          fontWeight: 400,
          fontStyle: 'normal',
        }}
      >
        二十歳おめでとう！🍰
        <br />
        来月ちゃんとお祝いしようね笑
        <br />
        素敵な1年になりますように！
      </Typography>
    </>
  );
};
