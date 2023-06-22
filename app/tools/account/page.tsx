import { SignedIn, UserProfile } from '@clerk/nextjs';
import Main from '../components/main';
import type { NextPage } from 'next';

const Page: NextPage = () => (
  <Main>
    <SignedIn>
      <UserProfile
        appearance={{
          elements: {
            navbarMobileMenuRow: 'hidden',
            navbar: 'hidden',
            card: 'shadow-none',
            pageScrollBox: 'py-0',
          },
        }}
      />
    </SignedIn>
  </Main>
);

export default Page;
