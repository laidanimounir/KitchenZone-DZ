
"use client";
 
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
 
const WHATSAPP_NUMBER = "213XXXXXXXXX"; // ← ضع رقمك هنا
 
const stats = [
  { value: 500, suffix: "+", label: "منتج متوفر" },
  { value: 1000, suffix: "+", label: "عميل سعيد" },
  { value: 100, suffix: "%", label: "جودة مضمونة" },
];
 
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
 
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.round(value) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);
 
  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}
 
export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن منتجاتكم")}`;
 
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      id="hero"
      dir="rtl"
    >
      {/* ── الصورة مع Reveal Animation ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <Image
          alt="ibro-kitchen hero"
          src="/assets/hero-kitchen.png"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay متدرج — داكن يسار، شفاف يمين */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/50 to-black/80" />
      </motion.div>
 
      {/* ── المحتوى ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
 
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-8 h-px bg-orange-400" />
          <span className="text-orange-400 text-sm tracking-widest uppercase font-medium">
            ibro-kitchen — الجزائر
          </span>
        </motion.div>
 
        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-3"
        >
          أدوات المطبخ
        </motion.h1>
 
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="text-4xl md:text-6xl font-extrabold text-orange-400 leading-tight mb-6"
        >
          لكل بيت جزائري
        </motion.h2>
 
        {/* الوصف */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-white/70 text-lg mb-10 max-w-md"
        >
          جودة تدوم — أسعار تناسبك
        </motion.p>
 
        {/* الأزرار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {/* زر تصفح المنتجات */}
          <a
            href="#products"
            className="group flex items-center gap-2 px-8 py-4 border border-white/40 text-white rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white hover:text-zinc-900 transition-all duration-300"
          >
            <span>تصفح المنتجات</span>
            <svg
              className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
 
          {/* زر واتساب */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#1ebe5d] transition-all duration-300 shadow-lg shadow-[#25D366]/25"
          >
            {/* أيقونة واتساب */}
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>تواصل معنا</span>
          </a>
        </motion.div>
 
        {/* الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="flex gap-10 border-t border-white/20 pt-8"
        >
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold text-white">
                <CountUp to={value} suffix={suffix} />
              </span>
              <span className="text-sm text-white/50">{label}</span>
            </div>
          ))}
        </motion.div>
 
      </div>
 
      {/* سهم للأسفل */}
      <motion.a
        href="#products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.a>
 
    </section>
  );
}