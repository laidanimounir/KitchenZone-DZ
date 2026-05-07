"use client";
import { useEffect } from "react";
import { Icons } from "./icons";
import SearchInput from "./SearchInput";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] transition-all duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex justify-center pt-24 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-x-2">
            <div className="flex-1">
              <SearchInput />
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 transition-colors p-2"
            >
              <Icons.close className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;