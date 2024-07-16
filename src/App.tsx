import { FC } from 'react';
import { RouterInstance } from './router/RouterInstance';
import { ProviderRoot } from './providers/ProviderRoot';

export const App: FC = () => {
  return (
    <ProviderRoot>
      <RouterInstance />
    </ProviderRoot>
  );
};
