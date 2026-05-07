import { Suspense } from "react";
import { CartLink, CartNav } from "../../features/carts";
import { UserNav } from "@/features/auth";
import { Icons } from "./icons";
import Link from "next/link";

interface NavActionsProps {
  adminLayout?: boolean;
}
 function NavActions({ adminLayout = false }: NavActionsProps) {
  return (
    <>
      <Suspense>
        <UserNav />
      </Suspense>
      <Link href="/wish-list" className="hover:opacity-70 transition-opacity">
        <Icons.heart className="w-5 h-5" aria-label="wishlist" />
      </Link>
      <Suspense fallback={<CartLink productCount={0} />}>
        {!adminLayout && <CartNav />}
      </Suspense>
    </>
  );
}

export default NavActions;