"use client";

import { SiApple, SiGoogle } from "@icons-pack/react-simple-icons";
import { AuthField } from "./AuthField";

export default function SignupThree() {
  return (
    <div className="flex min-h-[640px] w-full flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="w-full max-w-sm">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="/" className="flex flex-col items-center gap-2 font-medium text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-sm font-bold text-black">
                G
              </span>
              <span className="sr-only">gotlUI</span>
            </a>
            <h1 className="text-xl font-bold text-white">Welcome to gotlUI</h1>
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <a href="#" className="text-white underline underline-offset-2">
                Sign in
              </a>
            </p>
          </div>

          <AuthField
            label="Email"
            id="email-3"
            type="email"
            placeholder="m@example.com"
            required
          />

          <button
            type="submit"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Create Account
          </button>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="h-px flex-1 bg-white/10" />
            Or
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/30"
            >
              <SiApple size={16} />
              Continue with Apple
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/30"
            >
              <SiGoogle size={16} />
              Continue with Google
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-600">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-2">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
