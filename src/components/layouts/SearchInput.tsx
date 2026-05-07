"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const filterSelectionSchema = z.object({
  search: z.string(),
});

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof filterSelectionSchema>>({
    resolver: zodResolver(filterSelectionSchema),
    defaultValues: { search: searchParams.get("search") || "" },
  });

  function onSubmit({ search }: z.infer<typeof filterSelectionSchema>) {
    !search || search.length === 0
      ? router.push(`/shop`)
      : router.push(`/shop/?search=${search}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex items-center max-w-[400px] w-full"
      >
        <Icons.search
          className={cn(
            "absolute left-3 h-4 w-4 text-zinc-400 transition-all duration-300",
            isFocused ? "opacity-0" : "opacity-100",
          )}
        />

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="ابحث عن منتج..."
                  className={cn(
                    "rounded-full bg-zinc-100 border-0 transition-all duration-300",
                    "focus:bg-white focus:ring-1 focus:ring-zinc-300",
                    isFocused ? "pl-4" : "pl-9",
                  )}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="absolute right-2 h-7 w-7 p-0"
          type="submit"
          variant="ghost"
          size="sm"
        >
          <Icons.search
            className={cn(
              "h-4 w-4 text-zinc-500 transition-all duration-200",
              isFocused ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
          />
        </Button>
      </form>
    </Form>
  );
}

export default SearchInput;