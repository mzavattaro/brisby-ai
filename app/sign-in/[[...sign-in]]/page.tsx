import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-10">
      <div>
        <Image
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="BrisbyAI"
          width={50}
          height={50}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <SignIn />

      <p className="text-center text-sm leading-6 text-gray-500">
        Not a member?{' '}
        <Link
          href="#"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Start a 14-day free trial
        </Link>
      </p>
    </div>
  </div>
);

export default Page;
