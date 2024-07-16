import { FC, ReactNode } from 'react';
import { MUIProvider } from './MUIProvider';
import { SuspenseProvider } from './SuspenseProvider';
import { TanStackQueryProvider } from './TanStackQueryProvider';

type Props = {
  children: ReactNode;
};

export const ProviderRoot: FC<Props> = ({ children }) => {
  return (
    <SuspenseProvider>
      <TanStackQueryProvider>
        <MUIProvider>{children}</MUIProvider>
      </TanStackQueryProvider>
    </SuspenseProvider>
  );
};
