import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { fetchCompanions } from "@/lib/actions/companion.actions";
import { SearchParams } from "@/types/searchParams";

const CompanionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  const subject = params.subject ?? "";
  const topic = params.topic ?? "";

  console.log("Params", { subject, topic });

  const companions = await fetchCompanions({ subject, topic });

  console.log(companions);

  return (
    <main className="flex items-center justify-center mx-auto px-14 flex-col gap-8 bg-background h-full max-w-350 pt-10 max-sm:px-2 mb-5">
      <section className="flex w-full justify-between gap-4 max-sm:flex-col">
        <h1 className="text-3xl font-bold">Companion Library</h1>
        <div className="flex gap-4 w-1/2">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="flex flex-wrap gap-4 w-full max-md:justify-center justify-between">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>
    </main>
  );
};

export default CompanionsPage;
