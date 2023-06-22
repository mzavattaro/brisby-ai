'use client';

import { useState, useRef, useEffect } from 'react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import getFirstLetters from '@/lib/createInitials';
import { clsx } from '@/lib/clsx';
import type { FC } from 'react';

type DropdownMenuProps = {
  fullName: string | null | undefined;
  displayName: boolean;
  dropdownPlacement: 'bottom' | 'top';
  setSidebarOpen?: (open: boolean) => void;
  sidebarOpen?: boolean;
};

const DropdownMenu: FC<DropdownMenuProps> = ({
  fullName,
  displayName,
  dropdownPlacement,
  setSidebarOpen,
  sidebarOpen,
}) => {
  const initials = getFirstLetters(fullName);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleOpenMenuDropdown = () => {
    setOpen(!open);
  };

  const handleCloseMenuDropdown = () => {
    if (sidebarOpen && setSidebarOpen) {
      setSidebarOpen(false);
    }
    setOpen(false);
  };

  return (
    <div className="h-[26.5px]">
      <button type="button" onClick={handleOpenMenuDropdown}>
        <span
          className={clsx(
            'text-xs bg-purple-200 text-purple-700 font-semibold leading-6 rounded p-1.5'
          )}
        >
          {initials}
        </span>
        {displayName ? (
          <span
            className={clsx(
              'ml-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-900',
              open && 'text-gray-900'
            )}
          >
            {fullName}
          </span>
        ) : null}
      </button>

      {/* Dropdown */}
      <div className="absolute">
        <div
          ref={ref}
          className={clsx(
            'w-52 relative shadow-lg border rounded-md bg-white flex flex-col px-1 py-1.5 ',
            open ? 'block' : 'hidden',

            dropdownPlacement === 'top' && 'bottom-28',
            dropdownPlacement === 'bottom' && 'right-44 top-1'
          )}
        >
          <button type="button" onClick={handleCloseMenuDropdown}>
            <Link
              className="w-full pl-2 font-normal py-1.5 flex rounded hover:bg-gray-100 items-center text-sm"
              href="/tools/account"
            >
              <UserIcon className="h-5 w-5 shrink-0" />
              <span className="ml-3">Account</span>
            </Link>
          </button>

          <div className="w-full pl-2 font-normal py-1.5 flex rounded hover:bg-gray-100 items-center cursor-pointer">
            <SignOutButton>
              <div className="flex items-center">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 shrink-0" />
                <span className="ml-3">Sign out</span>
              </div>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
