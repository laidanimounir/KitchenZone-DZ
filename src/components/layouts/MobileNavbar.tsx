import { Suspense } from "react";
import CartNav from "../../features/carts/components/CartNav";
import Branding from "./Branding";
import MobileSearchInput from "./MobileSearchInput";
import { SideMenu } from "./SideMenu";
import CartLink from "../../features/carts/components/CartLink";
import { UserNav } from "@/features/auth";
import { Icons } from "./icons";
import Link from "next/link";

type Props = { adminLayout: boolean };

function MobileNavbar({ adminLayout }: Props) {
  return (
    <div className="md:hidden flex justify-between items-center h-[64px]">
      <div className="flex gap-x-2 items-center">
        <SideMenu />
        <MobileSearchInput />
      </div>

      <Branding />

      <div className="flex gap-x-4 items-center">
        <Suspense>
          <UserNav />
        </Suspense>
        <Link href="/wish-list" className="text-zinc-700 hover:text-zinc-900 transition-colors">
          <Icons.heart className="w-5 h-5" />
        </Link>
        <Suspense fallback={<CartLink productCount={0} />}>
          {!adminLayout && <CartNav />}
        </Suspense>
      </div>
    </div>
  );
}

export default MobileNavbar;