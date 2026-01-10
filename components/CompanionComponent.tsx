"use client";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { CallStatus } from "@/types/callStatus";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "../public/voiceanim.json";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mic } from "lucide-react";

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

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setisMuted(!isMuted);
  };

  const handleDisconnect = async () => {};

  const handleCall = async () => {};

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <Card className="w-2/3 max-sm:w-full">
          <CardContent className="flex flex-col items-center justify-center gap-6 p-6">
            <div className="relative size-72 max-sm:size-28 flex items-center justify-center rounded-xl bg-primary">
              <div
                className={cn(
                  "absolute transition-opacity duration-700",
                  callStatus === CallStatus.ACTIVE ? "opacity-0" : "opacity-100"
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={140}
                  height={140}
                />
              </div>

              <div
                className={cn(
                  "absolute transition-opacity duration-700",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  className="size-72 max-sm:size-28"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 w-1/3 max-sm:w-full max-sm:flex-row">
          <Card className="max-sm:hidden">
            <CardContent className="flex flex-col items-center gap-4 py-8">
              <Avatar className="size-32">
                <AvatarImage src={userImage} />
                <AvatarFallback>{userName?.[0]}</AvatarFallback>
              </Avatar>

              <p className="text-lg font-medium">{userName}</p>
            </CardContent>
          </Card>

          <Button
            variant={isMuted ? "default" : "destructive"}
            className="flex flex-col gap-2 py-8 max-sm:py-2 w-full"
            onClick={toggleMicrophone}
          >
            <Mic className="w-6 h-6" />
            <span className="max-sm:hidden">
              {isMuted ? "Turn on mic" : "Turn off mic"}
            </span>
          </Button>

          <Button
            variant={
              callStatus === CallStatus.ACTIVE ? "destructive" : "default"
            }
            className={cn(
              "w-full",
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

      <section className="relative flex flex-col gap-4 grow overflow-hidden">
        <div className="overflow-y-auto w-full flex flex-col gap-4 pr-2 h-full text-lg no-scrollbar">
          MESSAGES
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background via-background/90 to-transparent" />
      </section>
    </section>
  );
};

export default CompanionComponent;
