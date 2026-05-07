"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: 500, label: "منتج متوفر" },
  { value: 1000, label: "عميل سعيد" },
  { value: 100, label: "% جودة مضمونة" },
];

function AnimatedCounter({ to }: { to: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {to}+
    </motion.span>
  );
}

export default function HeroSection() {
  return (
    <section className="w-full h-screen mx-auto flex justify-center" id="hero">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative w-full h-full"
      >
        <Image
          alt="ibro-kitchen"
          src="/assets/bathroom-planning.jpg"
          width={1920}
          height={1200}
          priority={true}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="container absolute py-8 h-screen w-full">
        <div className="flex flex-col justify-center z-30 h-full gap-y-6">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm uppercase tracking-widest text-white/70"
          >
            ibro-kitchen — الجزائر
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-5xl md:text-8xl font-bold text-white leading-tight"
          >
            أدوات المطبخ
            <br />
            <span className="text-orange-400">لكل بيت جزائري</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-x-4"
          >
            
              href="#products"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-white text-white rounded-full px-8 py-3 md:px-12 md:py-6 hover:text-zinc-800 hover:bg-white transition-all",
              )}
            <a>
              تصفح المنتجات
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-full px-8 py-3 md:px-12 md:py-6 bg-orange-500 hover:bg-orange-600 border-0",
              )}
            >
              تواصل معنا
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex gap-x-10 mt-4"
          >
            {stats.map(({ value, label }, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  <AnimatedCounter to={value} />
                </span>
                <span className="text-sm text-white/60 mt-1">{label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}