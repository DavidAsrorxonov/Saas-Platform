import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants/recentSessions";

export default function Home() {
  return (
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-350 pt-10 max-sm:px-2 mb-5">
      <h1 className="text-3xl font-bold">Popular Companions</h1>
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <CompanionCard
          id="123"
          name="ChatGPT"
          topic="Coding"
          subject="AI"
          duration={40}
        />
        <CompanionCard
          id="124"
          name="ChatGPT"
          topic="Coding"
          subject="AI"
          duration={40}
        />
        <CompanionCard
          id="125"
          name="ChatGPT"
          topic="Coding"
          subject="AI"
          duration={40}
        />
      </section>

      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <CompanionsList
          title="Recently Completed Sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
}
