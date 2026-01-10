"use client";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { CallStatus } from "@/types/callStatus";
import { useEffect, useState } from "react";

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
  const [isSpeaking, setisSpeaking] = useState(false);

  useEffect(() => {
    const onCallStart = () => setcallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => setcallStatus(CallStatus.ENDED);

    const onMessage = () => {};

    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);

    const onError = (error: Error) => {
      console.log(error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.on("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

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
