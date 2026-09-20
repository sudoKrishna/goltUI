"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { AuthField } from "./AuthField";

export default function SignupOne() {
  return (
    <div className="grid min-h-[640px] w-full bg-black lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-bold text-black">
              G
            </span>
            gotlUI
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-xs flex-col gap-6"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold text-white">Create your account</h1>
              <p className="text-sm text-zinc-400">
                Fill in the form below to create your account
              </p>
            </div>

            <AuthField label="Full Name" id="name-1" placeholder="John Doe" required />
            <AuthField
              label="Email"
              id="email-1"
              type="email"
              placeholder="m@example.com"
              required
              description="We'll use this to contact you. We will not share your email with anyone else."
            />
            <AuthField
              label="Password"
              id="password-1"
              type="password"
              required
              description="Must be at least 8 characters long."
            />
            <AuthField
              label="Confirm Password"
              id="confirm-password-1"
              type="password"
              required
              description="Please confirm your password."
            />

            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Create Account
            </button>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="h-px flex-1 bg-white/10" />
              Or continue with
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/30"
            >
              <SiGithub size={16} />
              Sign up with GitHub
            </button>

            <p className="text-center text-xs text-zinc-500">
              Already have an account?{" "}
              <a href="#" className="text-white underline underline-offset-2">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="relative hidden bg-zinc-900 lg:flex lg:items-center lg:justify-center">
        <span className="text-sm text-zinc-600">Image</span>
      </div>
    </div>
  );
}
