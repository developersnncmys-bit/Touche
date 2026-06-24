import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Touché Interior Design Studio",
  description:
    "Begin a project, request a quote, or visit our studio in Indiranagar, Bangalore.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 md:pb-24 px-6 md:px-12 bg-ivory">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-champagne mb-4">— 05 / Contact</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal variant="fade">
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight">
                Begin a<br />
                <span className="italic text-taupe">conversation.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={120}>
              <p className="mt-8 max-w-xl text-lg text-ink/70 leading-relaxed">
                Tell us about your space. The more you share, the more
                precisely we can respond. All enquiries reach Apoorva
                directly.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Form + details */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 bg-ivory">
        <div className="grid grid-cols-12 gap-6 lg:gap-16 border-t border-ink/15 pt-16">
          <div className="col-span-12 lg:col-span-8">
            <ContactForm />
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-12">
            <div>
              <p className="eyebrow text-champagne mb-4">— Studio</p>
              <p className="text-ink/80 leading-loose">
                No. 27, 2nd Floor<br />
                100 Feet Road, Indiranagar 1st Stage<br />
                Bangalore — 560038<br />
                Karnataka, India
              </p>
            </div>
            <div>
              <p className="eyebrow text-champagne mb-4">— Direct</p>
              <p className="text-ink/80 leading-loose">
                <a href="mailto:hello@touche.studio" className="link-luxe">hello@touche.studio</a><br />
                <a href="tel:+919900566466" className="link-luxe">+91 99005 66466</a>
              </p>
            </div>
            <div>
              <p className="eyebrow text-champagne mb-4">— Hours</p>
              <p className="text-ink/80 leading-loose">
                Monday — Saturday<br />
                10:00 — 19:00 IST<br />
                Studio visits by appointment.
              </p>
            </div>
            <div>
              <p className="eyebrow text-champagne mb-4">— Statutory</p>
              <p className="text-ink/80 leading-loose text-sm">
                GSTIN — 29ABCDE1234F1Z5<br />
                CIN — U74999KA2018PTC123456
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 md:px-12 pb-24 md:pb-40 bg-ivory">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
          <iframe
            title="Touché Studio — Bangalore"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.5946%2C12.9716%2C77.6446%2C13.0016&amp;layer=mapnik&amp;marker=12.9866%2C77.6196"
            className="absolute inset-0 w-full h-full grayscale-[60%]"
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 bg-ivory px-6 py-4 shadow-sm">
            <p className="eyebrow text-champagne mb-1">— Studio</p>
            <p className="font-display text-xl">Indiranagar, Bangalore</p>
          </div>
        </div>
      </section>
    </>
  );
}
