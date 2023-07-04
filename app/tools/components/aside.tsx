import { clsx } from '@/lib/clsx';
import type { FC, ReactNode } from 'react';

type AsideProps = {
  children: ReactNode;
  className?: string;
};

const Aside: FC<AsideProps> = ({ children, className }) => (
  <aside
    className={clsx(
      'fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 py-6 xl:block',
      className
    )}
  >
    {children}
  </aside>
);

export default Aside;
