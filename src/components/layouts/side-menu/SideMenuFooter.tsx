import Link from "next/link";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";

function SideMenuFooter() {
  return (
    <div className="px-6 py-6 bg-white border-t border-zinc-100">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-3 text-zinc-500 text-sm">
          <Icons.globe className="w-4 h-4 shrink-0 text-zinc-400" />
          <span>{siteConfig.address}</span>
        </div>
        <div className="flex items-center gap-x-3 text-zinc-500 text-sm">
          <Icons.store className="w-4 h-4 shrink-0 text-zinc-400" />
          <span>{siteConfig.phone}</span>
        </div>
        <div className="flex items-center gap-x-3 text-zinc-500 text-sm">
          <Icons.user className="w-4 h-4 shrink-0 text-zinc-400" />
          <Link
            href={`mailto:${siteConfig.email}`}
            className="hover:text-zinc-800 transition-colors"
          >
            {siteConfig.email}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideMenuFooter;