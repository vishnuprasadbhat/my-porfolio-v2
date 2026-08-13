import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default async function LoginPage() {
  return (
    <main className="flex mob:items-start items-center justify-center h-screen cursor-auto">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="w-32  laptop:w-36">
          <Link
            href="/"
            className="flex items-start place-items-center text-lg"
          >
            <FaArrowLeft style={{ marginTop: "3px" }} className="mr-2" />
            <h1>Home</h1>
          </Link>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
