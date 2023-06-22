import { clsx } from '@/lib/clsx';
import type { FC, ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
  className?: string;
};

const Main: FC<MainProps> = ({ children, className }) => (
  <main className={clsx('lg:pl-60 xl:pr-96 py-10 lg:py-6', className)}>
    {children}
  </main>
);

export default Main;
