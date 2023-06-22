import { createElement } from 'react';
import { clsx } from '@/lib/clsx';
import type { FC } from 'react';

type HeadingProps = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: string;
  className?: string;
};

const headingClasses = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-medium',
  h3: 'font-medium text-2xl',
  h4: 'font-medium text-xl',
  h5: 'font-medium text-lg',
  h6: 'font-medium text-base',
};

const Heading: FC<HeadingProps> = ({ tag, children, className }) =>
  createElement(
    tag,
    {
      className: clsx(headingClasses[tag], className),
    },
    children
  );

export default Heading;
