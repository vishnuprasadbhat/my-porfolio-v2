"use client";

import {
  FaAt,
  FaKey,
  FaCircleExclamation,
  FaArrowRight,
} from "react-icons/fa6";
import { useActionState } from "react";
import { authenticate } from "@/app/actions";
import Button from "../Button";

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8 border">
        <h1 className={`mb-3 text-xl`}>Please login to edit this portfolio.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <FaAt className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <FaKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button
          type="primary"
          classes="mx-0 mt-5 tablet:mx-0 tablet:mt-5 laptop:mt-10 laptop:mx-0 w-full flex cursor-pointer"
          isForm
        >
          Log in <FaArrowRight className="ml-auto h-5 w-5" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage ? (
            <div className="flex items-center gap-2">
              <FaCircleExclamation className="h-4 w-4 text-red-500" />
              <p className="text-sm mt-1 text-red-500">{errorMessage}</p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
