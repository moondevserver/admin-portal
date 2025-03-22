import { Metadata } from "next";
import { UserForm } from "@/components/users/user-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "새 회원 등록",
  description: "새로운 회원을 등록합니다.",
};

export default function NewUserPage() {
  const emptyUser = {
    id: "",
    name: "",
    email: "",
    emailVerified: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
          <h2 className="text-3xl font-bold tracking-tight">새 회원 등록</h2>
          <p className="text-muted-foreground">
            새로운 회원을 등록할 수 있습니다.
          </p>
        </div>
      </div>
      <UserForm user={emptyUser} isNew={true} />
    </div>
  );
} 