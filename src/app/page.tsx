'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin');
    }
  }, [status]);

  if (status === 'loading') {
    return <div>로딩중...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">관리자 포털</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">환영합니다!</h2>
          <p className="text-gray-600">
            이 포털에서는 다음과 같은 작업을 수행할 수 있습니다:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>회원 관리</li>
            <li>권한 설정</li>
            <li>로그 확인</li>
            <li>시스템 설정</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 