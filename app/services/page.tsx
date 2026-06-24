import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { services } from "@/lib/services";

export const metadata = {
  title: "Services — Touché Interior Design Studio",
  description:
    "From residential design and turnkey execution to space planning and modular furniture — six considered services from Touché.",
};

const process = [
  { n: "01", label: "Listen", body: "A long conversation, your brief, your site." },
  { n: "02", label: "Direction", body: "Concept boards, samples and rough plans." },
  { n: "03", label: "Develop", body: "Drawings, BOQ, finishes, lighting, joinery." },
  { n: "04", label: "Execute", body: "Procurement, site supervision, weekly walkthroughs." },
  { n: "05", label: "Style", body: "Furniture, art, linen and the last cushion." },
  { n: "06", label: "Handover", body: "Snag list closed, walkthrough, keys in hand." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pb-32 px-6 md:px-12 bg-ivory">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-champagne mb-4">— 03 / Services</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal variant="fade">
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight">
                Six ways we<br />
                <span className="italic text-taupe">work with you.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={150}>
              <p className="mt-10 max-w-2xl text-lg text-ink/70 leading-relaxed">
                Whether you are commissioning a single room or a full villa,
                we shape engagements to match your scope, timeline and
                ambition. Every service is led by our principal designer.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service list */}
      <section className="bg-ivory pb-24 md:pb-40">
        <div className="border-t border-ink/15">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="group relative border-b border-ink/15 transition-colors duration-700 hover:bg-bone/60"
            >
              <div className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-1 text-champagne font-display text-2xl">
                  {s.num}
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-ink/70 max-w-md text-base leading-relaxed">
                    {s.short}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 md:pl-10">
                  <p className="text-ink/75 leading-relaxed mb-6">
                    {s.description}
                  </p>
                  <ul className="space-y-2 text-sm text-ink/60">
                    {s.scope.map((line) => (
                      <li key={line} className="flex items-baseline gap-3">
                        <span className="text-champagne">—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right flex md:flex-col items-end justify-between gap-4">
                  <Link
                    href="/contact"
                    className="text-[11px] tracking-luxe uppercase border-b border-ink/40 pb-1 hover:border-champagne hover:text-champagne transition-colors duration-500"
                  >
                    Get Quote
                  </Link>
                  <span className="font-display italic text-taupe text-xl md:mt-auto">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-cocoa text-ivory">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-champagne mb-4">— Process</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal variant="fade">
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
                From first sketch<br />
                <span className="italic text-champagne">to last cushion.</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {process.map((p, i) => (
            <ScrollReveal key={p.n} variant="fade" delay={i * 100}>
              <div className="border-t border-ivory/15 pt-6">
                <p className="font-display text-champagne text-4xl mb-3">{p.n}</p>
                <h3 className="font-display text-3xl mb-3">{p.label}</h3>
                <p className="text-ivory/65 text-sm leading-relaxed">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-ivory text-center">
        <ScrollReveal variant="fade">
          <p className="eyebrow text-champagne mb-6">— Engage</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mx-auto">
            Tell us about<br />
            <span className="italic text-taupe">your project.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-block mt-12 px-8 py-4 bg-ink text-ivory text-[11px] tracking-luxe uppercase hover:bg-champagne transition-colors duration-500"
          >
            Request a Quote →
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
