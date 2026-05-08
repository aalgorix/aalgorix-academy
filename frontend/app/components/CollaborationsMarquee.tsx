"use client";

import Image from "next/image";

type Item = { name: string; src: string };

const ITEMS: Item[] = [
  { name: "Canva", src: "/collaborations/canva.jpeg" },
  { name: "Claude", src: "/collaborations/claude.png" },
  { name: "ChatGPT", src: "/collaborations/chatgpt.webp" },
  { name: "Gemini", src: "/gemini.jpg" },
  { name: "Copilot", src: "/collaborations/copilot.jfif" },
  { name: "NotebookLM", src: "/collaborations/notebooklm.png" },
];

function Card({ item }: { item: Item }) {
  return (
    <div className="mx-4 flex h-28 w-[240px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:h-24 md:w-[300px] md:py-3">
      <div className="relative h-full w-full">
        <Image
          src={item.src}
          alt={item.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 240px, 300px"
        />
      </div>
    </div>
  );
}

export default function CollaborationsMarquee() {
  // Duplicate list for seamless loop
  const list = [...ITEMS, ...ITEMS];

  return (
    <section className="w-full bg-white text-[#0F172A]">
      <div className="mx-auto w-full max-w-9xl px-8 py-16 md:px-12">
        <div className="mb-6 flex items-end justify-between gap-1">
          <div>
            <p className="text-[24px] font-medium uppercase tracking-[0.18em] text-slate-900/70">
              Our Collaborations
            </p>
           
          </div>
         
        </div>

        <div className="aa-marquee rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">
          <div className="aa-marquee__track">
            {list.map((item, idx) => (
              <Card key={`${item.name}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

