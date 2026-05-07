import React from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  containerClassName?: string;
  itemsClassName?: string;
};

function SocialMedias({ containerClassName, itemsClassName }: Props) {
  return (
    <div className={cn("flex gap-x-5", containerClassName)}>
      <Link href="https://facebook.com/ibro-kitchen" target="_blank">
        <Icons.facebook
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 text-muted-foreground hover:text-primary",
            itemsClassName,
          )}
        />
      </Link>
      <Link href="https://instagram.com/ibro-kitchen" target="_blank">
        <Icons.globe
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 text-muted-foreground hover:text-primary",
            itemsClassName,
          )}
        />
      </Link>
    </div>
  );
}

export default SocialMedias;