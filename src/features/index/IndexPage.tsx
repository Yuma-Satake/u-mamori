import { FC, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { Box } from '@mui/material';

export const IndexPage: FC = () => {
  const scene = useRef(null);

  const updateScreenSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const screen = updateScreenSize();

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Constraint, Events } = Matter;
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
        lineWidth: 4,
        // strokeStyle: '#FFC0CB', // 紐の色を淡いピンクに設定
        strokeStyle: 'white', // 紐の色を白に設定
      },
    });

    Composite.add(engine.world, [omamori, string]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add periodic force to make the omamori swing
    Events.on(engine, 'beforeUpdate', () => {
      const randomX = (Math.random() - 0.5) * 0.001; // Random small force in x direction
      const randomY = (Math.random() - 0.5) * 0.001; // Random small force in y direction
      Matter.Body.applyForce(omamori, omamori.position, {
        x: randomX,
        y: randomY,
      });
    });

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
          background: 'linear-gradient(to bottom right, #ffccff, #ff99cc)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1,
        }}
      />
    </>
  );
};
