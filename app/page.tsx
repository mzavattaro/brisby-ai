import { SignedIn, UserButton } from '@clerk/nextjs';
import { Suspense } from 'react';
import Link from 'next/link';
import FetchApi from '@/lib/fetchApi';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <Suspense fallback={<div>Loading...</div>}>
      <FetchApi />
      <Link href="/tools/notice-generator">Notice generator</Link>
    </Suspense>
  </>
);

export default Home;
