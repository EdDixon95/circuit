"use client";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/",
          });
        }}
        className="flex w-full max-w-sm flex-col gap-4 p-6"
      >
        <h1 className="text-2xl font-semibold">Log in to Circuit</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-lg border p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-lg border p-3"
        />

        <button type="submit" className="rounded-lg bg-black p-3 text-white">
          Log in
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
