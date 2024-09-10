/* eslint-disable jsx-a11y/control-has-associated-label */
import { Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

export const BirthdayPage: FC = () => {
  const maxImgNumber = 3;
  const [targetImageNumber, setTargetImageNumber] = useState(0);
  const [prevImageNumber, setPrevImageNumber] = useState(0);
  const [isFading, setIsFading] = useState(false); // フェード状態の管理

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // フェード開始
      setTimeout(() => {
        setPrevImageNumber(targetImageNumber); // 現在の画像番号を保存
      }, 1000);
      setTargetImageNumber((prev) => {
        if (prev + 1 === maxImgNumber) return 0;
        return prev + 1;
      });
      setTimeout(() => {
        setIsFading(false); // フェード終了
      }, 5000); // フェードが終わった1秒後に状態を更新
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <Stack
        sx={{
          height: '100dvh',
          width: '100dvw',
        }}
      >
        {/* 新しい画像 */}
        <div
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(/momo/momo_${targetImageNumber}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out', // フェードイン効果
            opacity: isFading ? 1 : 0, // フェードが始まったら新しい画像をフェードイン
          }}
        />

        {/* 前の画像 */}
        <div
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(/momo/momo_${prevImageNumber}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // opacity: isFading ? 0 : 1, // フェードが始まったら前の画像をフェードアウト
          }}
        />
      </Stack>

      <Typography
        variant="caption"
        sx={{
          zIndex: 2,
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
