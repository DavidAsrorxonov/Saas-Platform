"use client";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants/subjects";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("subject");
  const initialSubject = query && query !== "" ? query : "all";

  const [subject, setSubject] = useState(initialSubject);

  useEffect(() => {
    const q = searchParams.get("subject");
    setSubject(q && q !== "" ? q : "all");
  }, [searchParams]);

  useEffect(() => {
    const current = searchParams.get("subject") || "all";
    if (current === subject) return;

    let newUrl = "";

    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }

    router.replace(newUrl, { scroll: false });
  }, [subject, searchParams]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="capitalize w-full">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject, idx) => (
          <SelectItem key={idx} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
