import { Badge } from "@/components/ui/badge";
import { fetchCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await fetchCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  if (!companion) redirect("/companions");

  return (
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5">
      <article className="flex justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div className="size-18 flex items-center justify-center max-md:hidden">
            <Image
              src={`/icons/${companion.subject}.svg`}
              alt="companion"
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{companion.name}</p>
              <Badge>{companion.subject}</Badge>
            </div>

            <p className="text-lg">{companion.topic}</p>
          </div>
        </div>

        <div className="items-start text-2xl max-md:hidden">
          {companion.duration} minutes
        </div>
      </article>
    </main>
  );
};

export default CompanionSession;
