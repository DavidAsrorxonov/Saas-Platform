import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Clock } from "lucide-react";

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
}: CompanionCardProps) => {
  return (
    <article className="flex flex-col border px-4 py-4 gap-5 w-full lg:max-w-102.5 justify-between">
      <div className="flex justify-between items-center">
        <Badge>{subject}</Badge>
        <Button className="border">
          <Bookmark size="14" />
        </Button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Clock size="14" />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <Button className="w-full justify-center">Launch Lesson</Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
