import ChangePasswordForm from "./ChangePasswordForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const SettingsPage = () => {
  return (
    <main className="flex items-start justify-center h-screen cursor-auto">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="w-32  laptop:w-36">
          <Link
            href="/dashboard"
            className="flex items-start place-items-center text-lg"
          >
            <FaArrowLeft style={{ marginTop: "3px" }} className="mr-2" />
            <h1>Back</h1>
          </Link>
        </div>
        <ChangePasswordForm />
      </div>
    </main>
  );
};

export default SettingsPage;
