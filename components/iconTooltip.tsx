import { useState, useRef, useEffect } from 'react';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { clsx } from '@/lib/clsx';
import Heading from './heading';
import type { FC, ReactNode } from 'react';

type IconTooltipProps = {
  children: ReactNode;
  heading: string;
};

const IconTooltip: FC<IconTooltipProps> = ({ children, heading }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside of it and open and close it when clicking on the icon
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTooltip = () => {
    setOpen(!open);
  };

  return (
    <div className="relative w-full">
      <button type="button" onClick={handleTooltip}>
        <QuestionMarkCircleIcon className="w-4 h-4 cursor-pointer" />
      </button>

      <div
        ref={ref}
        className={clsx(
          'w-fit absolute bg-white rounded-lg shadow-lg p-4',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center w-full place-content-between">
            <Heading tag="h6">{heading}</Heading>
            <button
              className="cursor-pointer"
              type="button"
              onClick={handleTooltip}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default IconTooltip;
