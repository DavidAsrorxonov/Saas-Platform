import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return (
    <main className="lg:w-1/3 md:w-2/3 items-center justify-center mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-350 pt-10 max-sm:px-2 mb-5">
      <article className="w-full gap-4 flex flex-col">
        <h1 className="text-3xl font-bold">Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  );
};

export default NewCompanion;
