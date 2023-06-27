'use client';

import { usePathname } from 'next/navigation';
import {
  LanguageIcon,
  DocumentDuplicateIcon,
  DocumentCheckIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import DesktopNavigation from './desktopNavigation';
import MobileNavigation from './mobileNavigation';
import type {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from 'react';

export type RouteProps = {
  navigation: {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> &
        RefAttributes<SVGSVGElement> & {
          title?: string | undefined;
          titleId?: string | undefined;
        }
    >;
    current: boolean;
  }[];
};

export type NavigationProps = {
  fullName: string;
};

const Navigation: FC<NavigationProps> = ({ fullName }) => {
  const pathName = usePathname();

  const navigation = [
    {
      name: 'Notice generator',
      href: '/tools/notice-generator',
      icon: LanguageIcon,
      current: pathName === '/tools/notice-generator',
    },
    {
      name: 'Notice reviewer',
      href: '/tools/notice-reviewer',
      icon: DocumentCheckIcon,
      current: pathName === '/tools/notice-reviewer',
    },
    {
      name: 'Tonality checker',
      href: '/tools/tonality-checker',
      icon: ChatBubbleOvalLeftEllipsisIcon,
      current: pathName === '/tools/tonality-checker',
    },
    {
      name: 'Noticeboard',
      href: '/tools/noticeboard',
      icon: DocumentDuplicateIcon,
      current: pathName === '/tools/noticeboard',
    },
  ];

  return (
    <>
      <MobileNavigation navigation={navigation} fullName={fullName} />
      <DesktopNavigation navigation={navigation} fullName={fullName} />
    </>
  );
};

export default Navigation;
