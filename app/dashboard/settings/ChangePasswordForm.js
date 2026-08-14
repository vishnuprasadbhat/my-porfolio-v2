"use client";

import { useActionState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { changePassword } from "@/app/actions";
import Button from "@/components/Button";

const initialState = { msg: "", status: "" };

const ChangePasswordForm = () => {
  const [state, formAction] = useActionState(changePassword, initialState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.msg);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-3 max-w-md">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8 border">
        <h1 className="mb-3 text-xl">Change password</h1>
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium"
            htmlFor="currentPassword"
          >
            Current password
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2"
            id="currentPassword"
            type="password"
            name="currentPassword"
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium"
            htmlFor="newPassword"
          >
            New password
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2"
            id="newPassword"
            type="password"
            name="newPassword"
            required
            minLength={12}
          />
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium"
            htmlFor="confirmPassword"
          >
            Confirm new password
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            minLength={12}
          />
        </div>
        <Button
          type="primary"
          classes="mx-0 mt-5 tablet:mx-0 tablet:mt-5 laptop:mt-10 laptop:mx-0 w-full flex items-center justify-center cursor-pointer"
          isForm
        >
          Update password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
