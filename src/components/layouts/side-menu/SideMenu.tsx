"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "../icons";
import Branding from "../Branding";
import SideMenuNavItem from "./SideMenuNavItem";
import SideMenuFooter from "./SideMenuFooter";
import { navItems } from "./navItems";

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 hover:bg-transparent">
          <Icons.menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full md:max-w-sm border-0 bg-zinc-50 p-0"
        closeButtonClassName="top-5 right-5 z-50"
      >
        <div className="flex flex-col h-full">
          <div className="px-6 pt-16 pb-6 bg-white border-b border-zinc-100">
            <Branding className="text-xl font-black text-zinc-900" />
            <p className="text-xs text-zinc-400 mt-1">متجر أدوات المطبخ</p>
          </div>

          <nav className="flex flex-col gap-y-3 px-4 py-6 flex-1">
            {navItems.map((item, index) => (
              <SideMenuNavItem key={index} {...item} />
            ))}
          </nav>

          <SideMenuFooter />
        </div>
      </SheetContent>
    </Sheet>
  );
}