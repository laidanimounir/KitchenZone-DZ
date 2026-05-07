import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = { className?: string };

function Branding({ className }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-black tracking-tight uppercase",
        "text-zinc-900 hover:text-zinc-600 transition-colors duration-200",
        className
      )}
    >
      ibro-kitchen
    </Link>
  );
}

export default Branding;