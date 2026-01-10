import CompanionComponent from "@/components/CompanionComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await fetchCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  if (!companion) redirect("/companions");

  return (
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-350 pt-10 max-sm:px-2 mb-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-12 bg-primary">
              <AvatarImage
                src={`/icons/${companion.subject}.svg`}
                className="p-3"
              />
            </Avatar>

            <div>
              <CardTitle className="flex items-center gap-2">
                {companion.name}
                <Badge>{companion.subject}</Badge>
              </CardTitle>
              <p className="text-muted-foreground text-sm">{companion.topic}</p>
            </div>
          </div>

          <p className="hidden md:block text-sm text-muted-foreground">
            {companion.duration} minutes
          </p>
        </CardHeader>
      </Card>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName}
        userImage={user.imageUrl}
      />
    </main>
  );
};

export default CompanionSession;
