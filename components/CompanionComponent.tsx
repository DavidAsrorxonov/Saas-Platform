"use client";

import { cn } from "@/lib/utils";
import { CallStatus } from "@/types/callStatus";
import { useState } from "react";

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE);

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center border">
          <div className="size-75 flex items-center justify-center max-sm:size-25 mt-4 bg-primary">
            <div
              className={cn("absolute transition-opacity duration-1000")}
            ></div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CompanionComponent;
