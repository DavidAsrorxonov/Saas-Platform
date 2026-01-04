import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Popular Companions</h1>
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <CompanionCard
          id="123"
          name="ChatGPT"
          topic="Coding"
          subject="AI"
          duration={40}
          color="#0ea5e9"
        />
        <CompanionCard
          id="124"
          name="ChatGPT"
          topic="Coding"
          subject="AI"
          duration={40}
          color="#0ea5e9"
        />
        <CompanionCard
          id="125"
          name="ChatGPT"
          topic="Coding"
          subject="AI"
          duration={40}
          color="#0ea5e9"
        />
      </section>

      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <CompanionsList />
        <CTA />
      </section>
    </main>
  );
}
