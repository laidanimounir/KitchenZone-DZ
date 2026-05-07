import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { CartLink, CartNav } from "../../features/carts";
import { UserNav } from "@/features/auth";
import { Icons } from "./icons";
import Branding from "./Branding";
import MobileNavbar from "./MobileNavbar";
import SearchInput from "./SearchInput";
import { SideMenu } from "./SideMenu";

interface MainNavbarProps {
  adminLayout?: boolean;
}

async function MainNavbar({ adminLayout = false }: MainNavbarProps) {
  return (
    <nav className="fixed z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div
        className={cn(
          adminLayout ? "mx-auto px-[3rem] max-w-[2500px] py-3" : "container",
        )}
      >
        <div className="hidden md:flex gap-x-8 justify-between items-center h-[64px]">
          <div className="flex gap-x-3 items-center">
            <SideMenu />
            <Branding />
          </div>

          {adminLayout ? (
            <></>
          ) : (
            <Suspense>
              <SearchInput />
            </Suspense>
          )}

          <div className="flex gap-x-6 relative items-center">
            <Suspense>
              <UserNav />
            </Suspense>

            <Link href={"/wish-list"} className="text-zinc-700 hover:text-zinc-900 transition-colors">
              <Icons.heart className="w-5 h-5" aria-label="wishlist" />
            </Link>

            <Suspense fallback={<CartLink productCount={0} />}>
              {!adminLayout && <CartNav />}
            </Suspense>
          </div>
        </div>

        <MobileNavbar adminLayout={adminLayout} />
      </div>
    </nav>
  );
}

export default MainNavbar;