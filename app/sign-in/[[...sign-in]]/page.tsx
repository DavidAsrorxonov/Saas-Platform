import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center mx-auto px-14 flex-col gap-8 bg-background h-full max-w-350 pt-10 max-sm:px-2 mb-5">
      <SignIn />
    </main>
  );
}
