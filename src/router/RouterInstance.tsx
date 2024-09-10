import { FC, ReactNode, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '@/components/pageContent/NotFoundPage';
import { IndexPage } from '@/features/index/IndexPage';
import { BirthdayPage } from '@/features/birthday/BirthdayPage';

const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

type RouteItemType = {
  path: string;
  element: ReactNode;
};

export const RouterInstance: FC = () => {
  const routeArray: RouteItemType[] = [
    {
      path: '/',
      element: <IndexPage />,
    },
    {
      path: '/birthday',
      element: <BirthdayPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  useEffect(() => {
    const imageUrls = [
      '/momo/momo_0.png',
      '/momo/momo_1.png',
      '/momo/momo_2.png',
      '/momo/momo_3.png',
    ];

    preloadImages(imageUrls);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routeArray.map((routeItem) => (
          <Route key={routeItem.path} path={routeItem.path} element={routeItem.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
