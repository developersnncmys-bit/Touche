import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";

export const metadata = {
  title: "About — Touché Interior Design Studio",
  description:
    "The story of Touché, led by founder Apoorva Yadav R — a Bangalore studio rooted in restraint, craft and considered detail.",
};

const values = [
  {
    n: "01",
    title: "Restraint",
    body: "We design slowly and edit firmly. Quiet rooms outlast loud ones.",
  },
  {
    n: "02",
    title: "Materiality",
    body: "We choose honest materials and let them age beautifully in plain sight.",
  },
  {
    n: "03",
    title: "Proportion",
    body: "We chase scale, light and sightlines before colour, finish or motif.",
  },
  {
    n: "04",
    title: "Craft",
    body: "We work with a small bench of artisans we have trusted for years.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-24 md:pb-32 px-6 md:px-12 bg-ivory">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-champagne mb-4">— 02 / About</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal variant="fade">
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight">
                A practice built<br />
                <span className="italic text-taupe">on quiet detail.</span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wide image */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 bg-ivory">
        <ScrollReveal variant="mask">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=2400&q=85"
              alt="Touché studio space"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Story */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-bone/40">
        <div className="grid grid-cols-12 gap-6 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow text-champagne mb-6">— The Studio</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight">
              An atelier rooted<br />
              <span className="italic text-taupe">in Bangalore.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-10 space-y-6 text-ink/75 text-lg leading-relaxed">
            <ScrollReveal variant="fade">
              <p>
                Touché was founded in 2018 as a small, considered design
                practice. Today we shape between eight and twelve projects a
                year — residences, ateliers, lounges and turnkey homes —
                each one received slowly and finished by hand.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={120}>
              <p>
                Our studio sits above a craftsman&apos;s workshop in
                Indiranagar. Stone samples lean against the walls, fabric
                hangs from oak rods, and conversations spill into the
                courtyard. It is, intentionally, a working room rather than
                a showroom.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={240}>
              <p>
                We design for clients who value editing over excess —
                families building their forever home, founders shaping a
                first flagship, hoteliers searching for an interior with
                soul. We work everywhere in India and increasingly across
                South Asia.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-ivory">
        <div className="grid grid-cols-12 gap-6 lg:gap-16 items-center">
          <div className="col-span-12 lg:col-span-5">
            <ScrollReveal variant="mask">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
                  alt="Apoorva Yadav R, Founder of Touché"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-10">
            <p className="eyebrow text-champagne mb-6">— Founder</p>
            <ScrollReveal variant="fade">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tight mb-8">
                Apoorva<br />
                <span className="italic text-taupe">Yadav R.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={120}>
              <p className="text-ink/75 text-lg leading-relaxed mb-6 max-w-xl">
                Trained at CEPT Ahmedabad and the Politecnico di Milano,
                Apoorva spent six years between Mumbai and Milan before
                returning to Bangalore to start Touché. Her work has been
                published in AD India, Elle Decor and Design Pataki.
              </p>
              <p className="text-ink/60 text-base leading-relaxed max-w-xl">
                She leads concept direction on every Touché project and is
                known for spending more time on door handles, transitions
                and shadow gaps than most designers do on entire rooms.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg">
              <div className="border-l border-ink/15 pl-4">
                <p className="eyebrow text-ink/50 mb-1">Education</p>
                <p className="text-sm">CEPT · PoliMi</p>
              </div>
              <div className="border-l border-ink/15 pl-4">
                <p className="eyebrow text-ink/50 mb-1">Press</p>
                <p className="text-sm">AD · Elle Decor</p>
              </div>
              <div className="border-l border-ink/15 pl-4">
                <p className="eyebrow text-ink/50 mb-1">Based</p>
                <p className="text-sm">Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-cocoa text-ivory">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-champagne mb-4">— Values</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal variant="fade">
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
                What makes<br />
                <span className="italic text-champagne">Touché, Touché.</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {values.map((v, i) => (
            <ScrollReveal key={v.n} variant="fade" delay={i * 120}>
              <div className={`pt-8 ${i !== 0 ? "lg:border-l lg:border-ivory/10 lg:pl-8" : "lg:pl-0"}`}>
                <p className="font-display text-champagne text-5xl mb-6">{v.n}</p>
                <h3 className="font-display text-3xl mb-4">{v.title}</h3>
                <p className="text-ivory/70 text-sm leading-relaxed">{v.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Marquee />

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-ivory text-center">
        <ScrollReveal variant="fade">
          <p className="eyebrow text-champagne mb-6">— Next</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mx-auto">
            See the work behind<br />
            <span className="italic text-taupe">the philosophy.</span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/gallery"
              className="px-8 py-4 bg-ink text-ivory text-[11px] tracking-luxe uppercase hover:bg-champagne transition-colors duration-500"
            >
              View Gallery
            </Link>
            <Link
              href="/contact"
              className="text-[11px] tracking-luxe uppercase border-b border-ink/40 pb-2 hover:border-champagne hover:text-champagne transition-colors duration-500"
            >
              Begin an Enquiry
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
