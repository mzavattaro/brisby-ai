import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { clsx } from '@/lib/clsx';
import Heading from '@/components/heading';
import type { RouteProps, NavigationProps } from './navigation';
import type { FC } from 'react';

export type DesktopNavigationProps = NavigationProps & RouteProps;

const DesktopNavigation: FC<DesktopNavigationProps> = ({ navigation }) => (
  <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col bg-white">
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
      <div className="flex h-16 shrink-0 items-center flex-row">
        <Heading tag="h3">Brisby</Heading>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      item.current
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={clsx(
                        item.current
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="-mx-6 mt-auto">
            <div className="gap-x-2 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: 'flex-row-reverse',
                    userButtonTrigger: 'rounded',
                    avatarBox: 'rounded',
                  },
                }}
              />
              <span className="sr-only">Your profile</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default DesktopNavigation;
