"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "../icons";
import Branding from "../Branding";
import SocialMedias from "../SocialMedias";

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 hover:bg-transparent">
          <Icons.menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full md:max-w-lg border-r-0 bg-white"
        closeButtonClassName="w-6 h-6 md:w-8 md:h-8 top-6 left-6"
      >
        <div className="flex flex-col h-full px-10 md:px-16 pt-24 pb-12">

          <nav className="flex flex-col gap-y-1 flex-1">
            {siteConfig.mainNav.map(({ title, href }, index) => (
              <Link
                key={index}
                href={href}
                className="group flex items-center justify-between py-4 border-b border-zinc-100 text-xl md:text-2xl font-medium text-zinc-800 hover:text-zinc-500 transition-colors duration-200"
              >
                {title}
                <Icons.chevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </nav>

          <SheetFooter className="flex flex-col items-start space-x-0 mt-auto gap-y-4">
            <Branding className="text-2xl md:text-3xl font-black" />
            <div className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              <p>{siteConfig.address}</p>
              <p className="mt-1">
                <span>{siteConfig.phone}</span>
                {` · `}
                <Link
                  className="hover:text-zinc-700 transition-colors"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </Link>
              </p>
            </div>
            <SocialMedias />
          </SheetFooter>

        </div>
      </SheetContent>
    </Sheet>
  );
}