import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = { className?: string };

function Branding({ className }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-bold align-middle tracking-tight",
        "text-amber-900 hover:text-amber-700 transition-colors duration-200",
        className
      )}
    >
       ibro-kitchen 
    </Link>
  );
}

export default Branding;