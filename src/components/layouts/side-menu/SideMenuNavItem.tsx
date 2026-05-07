import Link from "next/link";
import { type Icon } from "@/components/layouts/icons";

interface SideMenuNavItemProps {
  title: string;
  href: string;
  icon: Icon;
  color: string;
  gradient: string;
}

function SideMenuNavItem({ title, href, icon: Icon, color, gradient }: SideMenuNavItemProps) {
  return (
    <Link
      href={href}
      className="group flex items-center rounded-2xl overflow-hidden bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all duration-300"
    >
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center w-14 h-14 shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="flex-1 px-4 text-base font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors" style={{ direction: "rtl" }}>
        {title}
      </span>
      <div className="w-1.5 h-14 rounded-l-full shrink-0" style={{ backgroundColor: color }} />
    </Link>
  );
}

export default SideMenuNavItem;