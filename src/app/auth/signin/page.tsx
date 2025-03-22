'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignIn() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    if (session) {
      redirect('/');
    }
    
    const loadProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    
    loadProviders();
  }, [session]);

  if (!providers) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            관리자 로그인
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="text-center">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {provider.name}로 로그인
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 