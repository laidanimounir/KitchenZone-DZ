import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = { className?: string; scrolled?: boolean };

function Branding({ className, scrolled }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-black tracking-tight uppercase transition-colors duration-300",
        scrolled ? "text-zinc-900" : "text-black",
        className,
      )}
    >
      ibro-kitchen
    </Link>
  );
}

export default Branding;