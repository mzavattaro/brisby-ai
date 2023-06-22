import { clsx } from '@/lib/clsx';
import type { FC } from 'react';

type ButtonProps = {
  type: 'button' | 'reset' | 'submit' | undefined;
  variant: 'primary' | 'secondary' | 'tertiary';
  children: string;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ children, type, variant, disabled }) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled}
    className={clsx(
      'w-fit rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2',
      variant === 'primary' &&
        'bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 active:bg-indigo-700 text-white',
      variant === 'secondary' &&
        'bg-white text-gray-900 hover:bg-gray-50 ring-1 ring-inset ring-gray-300',
      variant === 'tertiary' &&
        'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
      disabled && 'bg-gray-300 cursor-not-allowed'
    )}
  >
    {children}
  </button>
);

export default Button;
