import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
}: CompanionCardProps) => {
  return (
    <article className="flex flex-col rounded-4xl border border-black px-4 py-4 gap-5 w-full min-lg:max-w-[410px] justify-between">
      <div className="flex justify-between items-center">
        <Badge>{subject}</Badge>
        <Button className="rounded-4xl">
          <Image
            src={"/icons/bookmark.svg"}
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </Button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src={"/icons/clock.svg"}
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <Button className="w-full justify-center">Launch Lesson</Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
