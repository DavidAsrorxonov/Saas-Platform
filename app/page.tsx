import CompanionCard from "@/components/CompanionCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <CompanionCard />
        <CompanionCard />
        <CompanionCard />
      </section>
    </main>
  );
}
