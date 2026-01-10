"use client";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { CallStatus } from "@/types/callStatus";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "../public/voiceanim.json";
import { Button } from "./ui/button";

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
  const [isMuted, setisMuted] = useState(false);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

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

  const toggleMicraphone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setisMuted(!isMuted);
  };

  const handleDisconnect = async () => {};

  const handleCall = async () => {};

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center border">
          <div className="size-75 flex items-center justify-center max-sm:size-25 mt-4 bg-primary">
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ENDED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className={"size-75 max-sm:size-25"}
              />
            </div>
          </div>

          <p className="font-bold text-2xl">{name}</p>
        </div>

        <div className="flex flex-col gap-4 w-1/3 max-sm:w-full max-sm:flex-row">
          <div className="border-2 border-primary flex flex-col gap-4 items-center rounded-lg py-8 max-sm:hidden">
            <Image src={userImage} alt={userName} width={130} height={130} />

            <p className="font-bold text-2xl">{userName}</p>
          </div>

          <Button
            className="border-2 flex flex-col gap-2 items-center py-8 max-sm:py-2 cursor-pointer w-full"
            onClick={toggleMicraphone}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on mic" : "Turn off mic"}
            </p>
          </Button>
          <Button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End the session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start a new session"}
          </Button>
        </div>
      </section>

      <section className="relative flex flex-col gap-4 w-full items-center pt-10 grow overflow-hidden">
        <div className="overflow-y-auto w-full flex flex-col gap-4 max-sm:gap-2 pr-2 h-full text-2xl no-scrollbar">
          MESSAGES
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 max-sm:h-20 bg-linear-to-t from-background via-background/90 to-transparent z-10" />
      </section>
    </section>
  );
};

export default CompanionComponent;
