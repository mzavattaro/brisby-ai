import React from 'react';
import type { FC, ReactNode } from 'react';

const NoticeGeneratorLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section>{children}</section>
);

export default NoticeGeneratorLayout;
