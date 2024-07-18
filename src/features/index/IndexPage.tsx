import { FC, useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Box, Button, Stack, Typography } from '@mui/material';

export const IndexPage: FC = () => {
  const scene = useRef(null);
  const [isDisplayButton, setIsDisplayButton] = useState(true);

  const [displayedText, setDisplayedText] = useState('');
  const text = 'ももか頑張ってえらい！';
  const speed = 300;

  useEffect(() => {
    let index = 0;
    const typeText = () => {
      const newText = (() => {
        const emojis = [
          '🍰',
          '🍓',
          '🧁',
          '🎉',
          '👏',
          '🎈',
          '✨',
          '🎊',
          '🎂',
          '🍒',
          '🥳',
          '🎶',
          '🎁',
        ];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        if (index >= text.length - 1) return text + randomEmoji;
        return text.slice(0, index + 1);
      })();
      setDisplayedText(newText);
      index += 1;
      if (index === text.length) {
        index = 0; // Reset index to start over
      }
    };
    const intervalId = setInterval(typeText, speed);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [text, speed]);

  const updateScreenSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const screen = updateScreenSize();

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Constraint } = Matter;
    const engine = Engine.create();
    const render = Render.create({
      element: scene.current,
      engine,
      options: {
        width: screen.width,
        height: screen.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    const omamori = Bodies.rectangle(screen.width / 2, screen.height / 2, 50, 100, {
      render: {
        sprite: {
          texture: '/omamori.png',
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    });

    const string = Constraint.create({
      pointA: { x: screen.width / 2, y: screen.height / 4 },
      bodyB: omamori,
      pointB: { x: 5, y: -48 },
      length: 150,
      stiffness: 1.1,
      render: {
        lineWidth: 6,
        strokeStyle: '#FFC0CB', // 紐の色を淡いピンクに設定
      },
    });

    Composite.add(engine.world, [omamori, string]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const tiltX = event.gamma ?? 0; // 横の傾き（-90から90の範囲）
      const tiltY = event.beta ?? 0; // 縦の傾き（-180から180の範囲）

      const forceMagnitude = 0.001;
      const forceX = (tiltX / 40) * forceMagnitude;
      const forceY = (tiltY / 150) * forceMagnitude;

      Matter.Body.applyForce(omamori, omamori.position, {
        x: forceX,
        y: forceY,
      });
    };

    const requestOrientationPermission = () => {
      setIsDisplayButton(false);
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        // eslint-disable-next-line
        // @ts-ignore
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        // eslint-disable-next-line
        // @ts-ignore
        DeviceOrientationEvent.requestPermission()
          // eslint-disable-next-line
          // @ts-ignore
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          });
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    window.addEventListener('click', requestOrientationPermission);

    const handleResize = () => {
      const newSize = updateScreenSize();
      render.bounds.max.x = newSize.width;
      render.bounds.max.y = newSize.height;
      render.options.width = newSize.width;
      render.options.height = newSize.height;
      render.canvas.width = newSize.width;
      render.canvas.height = newSize.height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('click', requestOrientationPermission);
    };
  }, []);

  return (
    <>
      <div ref={scene} />
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100dvw',
          height: '100dvh',
          // background: 'linear-gradient(to bottom right, #ffccff, #ff99cc)',
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          borderRadius: '100px 0 100px 0',
          zIndex: -1,
        }}
      >
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            height: '85%',
          }}
          spacing={3}
        >
          {isDisplayButton && (
            <Button
              sx={{
                pointerEvents: 'auto',
                position: 'absolute',
                zIndex: 30,
                bottom: '5%',
              }}
              variant="outlined"
              size="small"
            >
              <Typography variant="caption">ここをタップ！</Typography>
            </Button>
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              opacity: 0.95,
            }}
          >
            {displayedText}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          width: '100dvw',
          height: '100dvh',
          inset: 0,
          zIndex: -3,
          bgcolor: '#F3FFFD',
        }}
      />
    </>
  );
};
