'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            오류가 발생했습니다
          </h2>
          <div className="mt-4 text-center text-red-600">
            {error}
          </div>
          <div className="mt-4 text-center">
            <a
              href="/auth/signin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              로그인 페이지로 돌아가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 