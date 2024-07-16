import { FC, ReactNode, Suspense } from 'react';
import { LoadingPage } from '@/components/pageContent/LoadingPage';

type Props = {
  children: ReactNode;
};

export const SuspenseProvider: FC<Props> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};
