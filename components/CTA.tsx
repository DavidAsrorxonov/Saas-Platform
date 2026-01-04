import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <Card className="rounded-none px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
      <Badge>Start learning your way.</Badge>
      <h2 className="text-3xl font-bold">
        Build and personalize learning companion
      </h2>
      <p>
        Pick a name, subject, voice, & personalize - and start learning through
        conversations that feel natural and fun.
      </p>
      <Image src={"/images/cta.svg"} alt="cta" width={362} height={232} />
      <Button className="w-full">
        <Plus />
        <Link href={"/companions/new"}>
          <p>Build a new companion</p>
        </Link>
      </Button>
    </Card>
  );
};

export default CTA;
