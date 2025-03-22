import { Metadata } from "next";
import { UserForm } from "@/components/users/user-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원 정보",
  description: "회원 정보를 조회하고 수정합니다.",
};

interface Props {
  params: {
    id: string;
  };
}

async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export default async function UserPage({ params }: Props) {
  const user = await getUser(params.id);

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            돌아가기
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">회원 정보</h2>
          <p className="text-muted-foreground">
            회원 정보를 조회하고 수정할 수 있습니다.
          </p>
        </div>
      </div>
      <UserForm user={user} />
    </div>
  );
} 