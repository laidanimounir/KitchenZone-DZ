"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { keytoUrl } from "@/lib/utils";
import { DocumentType } from "@/gql";
import { CollectionCardFragment } from "@/features/collections";

interface CollectionsSectionProps {
  collections: { node: DocumentType<typeof CollectionCardFragment> }[];
}

function CollectionCard({ node }: { node: any }) {
  return (
    <Link
      href={`/collections/${node.slug}`}
      className="group relative flex-shrink-0 w-[200px] md:w-[240px] h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer"
    >
      <Image
        src={keytoUrl(node.featuredImage.key)}
        alt={node.featuredImage.alt}
        fill
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* overlay دائم */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* overlay hover */}
      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-500" />
      {/* border hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-400 transition-all duration-300" />
      {/* النص */}
      <div className="absolute bottom-0 right-0 left-0 p-5">
        <p className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors duration-300 text-right">
          {node.label}
        </p>
        <p className="text-white/50 text-xs text-right mt-1 group-hover:text-white/70 transition-colors duration-300">
          اكتشف المجموعة
        </p>
      </div>
    </Link>
  );
}

export default function CollectionsSection({ collections }: CollectionsSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [paused, setPaused] = useState(false);

  const doubled = [...collections, ...collections];

  return (
    <section
      ref={ref}
      id="collections"
      className="py-24 overflow-hidden bg-[#0f0f0f]"
      dir="rtl"
    >
      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-right px-8 md:px-20 mb-12"
      >
        <p className="text-orange-400 text-sm tracking-widest uppercase font-medium mb-2">
          تصفح حسب الصنف
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          اكتشف أصنافنا
        </h2>
        {/* خط برتقالي */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] w-24 bg-orange-400 mt-4 origin-right"
        />
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* fade يسار */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        {/* fade يمين */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6"
          style={{
            animation: paused ? "none" : "marquee 30s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map(({ node }, index) => (
            <CollectionCard key={`${node.id}-${index}`} node={node} />
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}