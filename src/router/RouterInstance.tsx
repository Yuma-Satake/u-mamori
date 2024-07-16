import { FC, ReactNode } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '@/components/pageContent/NotFoundPage';
import { IndexPage } from '@/features/index/IndexPage';

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
      path: '*',
      element: <NotFoundPage />,
    },
  ];

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
