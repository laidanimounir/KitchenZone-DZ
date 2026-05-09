"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn, keytoUrl } from "@/lib/utils";
import { DocumentType } from "@/gql";
import { CollectionCardFragment } from "@/features/collections";

interface CollectionsSectionProps {
  collections: { node: DocumentType<typeof CollectionCardFragment> }[];
}

function CollectionCircle({
  node,
  index,
}: {
  node: any;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/collections/${node.slug}`}
        className="group flex flex-col items-center gap-3"
      >
        {/* الدائرة */}
        <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden bg-zinc-100">
          {/* hover */}
          <span className="absolute inset-0 rounded-full border-2 border-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <Image
            src={keytoUrl(node.featuredImage.key)}
            alt={node.featuredImage.alt}
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* overlay عند hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10" />
        </div>

      
        <motion.p
          className="text-zinc-800 font-semibold text-sm tracking-wide text-center group-hover:text-orange-500 transition-colors duration-300"
        >
          {node.label}
        </motion.p>
      </Link>
    </motion.div>
  );
}

export default function CollectionsSection({ collections }: CollectionsSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="collections" className="py-20 px-4" dir="rtl">

   
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-4"
      >
        <p className="text-orange-400 text-sm tracking-widest uppercase font-medium mb-2">
          تصفح حسب الصنف
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
          اكتشف أصنافنا
        </h2>
      </motion.div>

      {/* الخط البرتقالي المتحرك */}
      <div className="flex justify-center mb-14">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] w-24 bg-orange-400 origin-right"
        />
      </div>

   
      {inView && (
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {collections.map(({ node }, index) => (
            <CollectionCircle key={node.id} node={node} index={index} />
          ))}
        </div>
      )}

    </section>
  );
}