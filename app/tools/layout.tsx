import React from 'react';
import { currentUser } from '@clerk/nextjs';
import Navigation from './components/navigation/navigation';
import type { FC, ReactNode } from 'react';

const ToolsLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const user = await currentUser();

  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;

  return (
    <section className="h-full">
      <Navigation fullName={fullName} />
      {children}
    </section>
  );
};

export default ToolsLayout;
