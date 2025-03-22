import { Metadata } from "next";
import { UsersTable } from "@/components/users/users-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원 관리",
  description: "회원 목록을 조회하고 관리합니다.",
};

export default async function UsersPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">회원 관리</h2>
          <p className="text-muted-foreground">
            전체 회원 목록을 조회하고 관리할 수 있습니다.
          </p>
        </div>
        <Link href="/users/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            새 회원 등록
          </Button>
        </Link>
      </div>
      <UsersTable />
    </div>
  );
} 