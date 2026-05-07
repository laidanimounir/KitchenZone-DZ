"use client";
import React, { useState } from "react";
import { Icons } from "./icons";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";

function MobileSearchInput() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  return (
    <>
      {openSearchBar ? (
        <div className="absolute left-0 right-0 top-0 h-[64px] bg-white/95 backdrop-blur-md flex items-center px-4 z-50 gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => setOpenSearchBar(false)}
          >
            <Icons.chevronLeft size={18} className="text-zinc-600" />
          </Button>
          <div className="flex-1">
            <SearchInput />
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={() => setOpenSearchBar(true)}
        >
          <Icons.search size={18} className="text-zinc-700" />
        </Button>
      )}
    </>
  );
}

export default MobileSearchInput;