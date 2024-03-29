import { clsx } from '@/lib/clsx';
import type { FC, RefObject, ChangeEvent } from 'react';

type InputProps = {
  ariaLabel: string;
  forwardRef?: RefObject<HTMLInputElement>;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  showLabel: boolean;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({
  ariaLabel,
  forwardRef,
  type,
  name,
  id,
  placeholder,
  showLabel,
  className,
  value,
  onChange,
}) => (
  <>
    <label
      htmlFor="email"
      className={clsx(
        'block text-sm font-medium leading-6 text-gray-900',
        showLabel ? '' : 'sr-only'
      )}
    >
      Email
    </label>

    <input
      aria-label={ariaLabel}
      ref={forwardRef}
      type={type}
      name={name}
      id={id}
      className={clsx(
        'block h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </>
);

export default Input;
