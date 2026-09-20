"use client";

import { AuthField } from "./AuthField";

export default function SignupTwo() {
  return (
    <div className="flex min-h-[640px] w-full flex-col items-center justify-center gap-6 bg-zinc-950 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-bold text-black">
            G
          </span>
          gotlUI
        </a>

        <div className="rounded-2xl border border-white/10 bg-black">
          <div className="p-6 pb-0 text-center">
            <h1 className="text-xl font-bold text-white">Create your account</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Enter your email below to create your account
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
              <AuthField label="Full Name" id="name-2" placeholder="John Doe" required />
              <AuthField
                label="Email"
                id="email-2"
                type="email"
                placeholder="m@example.com"
                required
              />

              <div>
                <div className="grid grid-cols-2 gap-4">
                  <AuthField label="Password" id="password-2" type="password" required />
                  <AuthField
                    label="Confirm Password"
                    id="confirm-password-2"
                    type="password"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500">Must be at least 8 characters long.</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  Create Account
                </button>
                <p className="text-center text-xs text-zinc-500">
                  Already have an account?{" "}
                  <a href="#" className="text-white underline underline-offset-2">
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <p className="max-w-sm px-6 text-center text-xs text-zinc-600">
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
  );
}
