import type { NavItemWithOptionalChildren } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ibro-kitchen",
  description: "متجر أدوات المطبخ الجزائري",
  url: "https://ibro-kitchen.dz",
  address: "الجزائر العاصمة، الجزائر",
  phone: "+213 776171171",
  email: "ibro-kitchen@gmail.com",
  mainNav: [
    {
      title: "المتجر",
      href: "/shop",
      description: "كل منتجاتنا",
      items: [],
    },
    {
      title: "المجموعات",
      href: "/collections",
      description: "تصفح المجموعات",
      items: [],
    },
    {
      title: "العروض",
      href: "/shop?filter=sale",
      description: "أفضل العروض",
      items: [],
    },
    {
      title: "تواصل معنا",
      href: "/contact",
      description: "تواصل معنا",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};