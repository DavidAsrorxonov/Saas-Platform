"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative items-center flex gap-2 px-2 py-1 h-fit">
      <InputGroup>
        <InputGroupInput
          placeholder="Search companions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
