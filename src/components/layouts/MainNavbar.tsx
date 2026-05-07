"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { CartLink, CartNav } from "../../features/carts";
import { UserNav } from "@/features/auth";
import { Icons } from "./icons";
import Branding from "./Branding";
import MobileNavbar from "./MobileNavbar";
import { SideMenu } from "./SideMenu";
import SearchOverlay from "./SearchOverlay";

interface MainNavbarProps {
  adminLayout?: boolean;
}

function MainNavbar({ adminLayout = false }: MainNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-100"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            adminLayout ? "mx-auto px-[3rem] max-w-[2500px] py-3" : "container",
          )}
        >
          <div className="hidden md:flex gap-x-8 justify-between items-center h-[64px]">
            <div className="flex gap-x-3 items-center">
              <SideMenu />
              <Branding scrolled={scrolled} />
            </div>

            <div
              className={cn(
                "flex gap-x-6 relative items-center",
                scrolled ? "text-zinc-800" : "text-white",
              )}
            >
              {!adminLayout && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <Icons.search className="w-5 h-5" />
                </button>
              )}

              <Suspense>
                <UserNav />
              </Suspense>

              <Link
                href="/wish-list"
                className="hover:opacity-70 transition-opacity"
              >
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default MainNavbar;