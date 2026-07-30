"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useRef } from "react";

export default function SearchBar() {
  const pathname = usePathname();
  console.log(pathname);
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    // console.log(value);

    // const params = new URLSearchParams()

    // if(value){
    //     params.set("searchTerm", value)
    // }else{
    //     params.delete("searchTerm")
    // }

    // router.replace(`${pathname}?${params.toString()}`)

    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      console.log(value);
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search gear, brand, or specs..."
        defaultValue={
          searchParams.get("searchTerm")
            ? searchParams.get("searchTerm")?.toString()
            : ""
        }
        onChange={(e) => handleChange(e.target.value)}
        className="pl-9"
      />
    </>
  );
}
