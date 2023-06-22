import { clsx } from '@/lib/clsx';
import type { FC, ReactNode } from 'react';

type AsideProps = {
  children: ReactNode;
  className?: string;
};

const Aside: FC<AsideProps> = ({ children, className }) => (
  <aside
    className={clsx(
      'fixed bg-slate-50 inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block',
      className
    )}
  >
    {children}
  </aside>
);

export default Aside;
