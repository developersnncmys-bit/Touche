"use client";

const words = [
  "Residential",
  "Commercial",
  "Turnkey",
  "Space Planning",
  "Modular Furniture",
  "Consultation",
];

export default function Marquee() {
  return (
    <section className="bg-ivory border-y border-ink/10 overflow-hidden py-10">
      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 pr-12">
            {words.map((w, j) => (
              <span key={`${i}-${j}`} className="flex items-center gap-12">
                <span className="font-display italic text-5xl md:text-7xl text-ink/80 whitespace-nowrap">
                  {w}
                </span>
                <span className="text-champagne text-2xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
