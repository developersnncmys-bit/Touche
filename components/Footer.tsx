"use client";

import Link from "next/link";

const localities = [
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "Jayanagar",
  "Sarjapur Road",
  "Hebbal",
  "Banashankari",
  "JP Nagar",
  "BTM Layout",
  "Marathahalli",
  "Bellandur",
  "MG Road",
  "Yelahanka",
  "Hennur",
  "Frazer Town",
  "Richmond Town",
  "Malleshwaram",
  "Rajajinagar",
  "Sadashivanagar",
  "Basavanagudi",
  "RT Nagar",
  "Cox Town",
  "Domlur",
];

const companyLinks = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function Instagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function Facebook({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTube({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

function LinkedIn({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Pinterest({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 19c1-4 2-6 4-12" />
      <path d="M12 7a3.5 3.5 0 0 1 3.5 3.5c0 2.5-2 4-3.5 4s-2.5-1-2.5-2.2" />
    </svg>
  );
}

function ArrowUp({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

const socials = [
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "YouTube", Icon: YouTube },
  { href: "#", label: "LinkedIn", Icon: LinkedIn },
  { href: "#", label: "Pinterest", Icon: Pinterest },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="px-6 md:px-12 lg:px-16 pt-20 md:pt-24 pb-8">
        {/* ── Main 5-column grid (HEAVN-style) ──
            Brand on the left, three info columns, then Follow Us on the right. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-10 pb-14">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Touché — Home" className="inline-block">
              <span className="font-display font-black uppercase text-[36px] lg:text-[44px] leading-[0.9] tracking-[0.04em] text-ivory">
                Touché
              </span>
            </Link>
            <p className="mt-6 text-[13px] text-ivory/55 leading-relaxed max-w-[220px]">
              A Bangalore atelier shaping considered residential and commercial
              interiors since 2018.
            </p>
            <p className="mt-5 text-[12px] text-ivory/40">
              Touché Interior Design Studio Pvt Ltd.
            </p>
          </div>

          {/* Col 2 — Studio (address) */}
          <div>
            <h4 className="font-display font-medium text-[15px] text-ivory mb-5">
              Studio
            </h4>
            <address className="not-italic text-[13px] text-ivory/65 leading-[1.85]">
              No. 27, 2nd Floor
              <br />
              Indiranagar 1st Stage
              <br />
              Bangalore — 560038
              <br />
              Karnataka, India
            </address>
          </div>

          {/* Col 3 — Contact (email, phone, hours) */}
          <div>
            <h4 className="font-display font-medium text-[15px] text-ivory mb-5">
              Contact
            </h4>
            <div className="text-[13px] text-ivory/65 leading-[1.85]">
              <a
                href="mailto:hello@touche.studio"
                className="block hover:text-champagne transition-colors duration-500"
              >
                hello@touche.studio
              </a>
              <a
                href="tel:+919900566466"
                className="block hover:text-champagne transition-colors duration-500"
              >
                +91 99005 66466
              </a>
              <p className="mt-3 text-ivory/50">
                Mon — Sat, 10:00 — 19:00
                <br />
                By appointment
              </p>
            </div>
          </div>

          {/* Col 4 — Company links */}
          <div>
            <h4 className="font-display font-medium text-[15px] text-ivory mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-[13px] text-ivory/65">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-champagne transition-colors duration-500"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-champagne transition-colors duration-500"
                >
                  Begin Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5 — Follow Us */}
          <div>
            <h4 className="font-display font-medium text-[15px] text-ivory mb-5">
              Follow Us
            </h4>
            <ul className="flex flex-wrap items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-ivory/15 text-ivory/75 hover:text-ink hover:bg-ivory hover:border-ivory transition-colors duration-500"
                  >
                    <Icon className="w-[15px] h-[15px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Locality SEO band — kept, more compact ── */}
        <div className="py-8 border-t border-ivory/10">
          <p className="text-[10px] tracking-luxe uppercase text-champagne mb-4">
            Interior Designers across Bangalore
          </p>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[11px] text-ivory/40 leading-relaxed">
            {localities.map((loc, i) => (
              <li key={loc} className="flex items-center gap-x-2">
                <Link
                  href="/contact"
                  className="hover:text-champagne transition-colors duration-500 whitespace-nowrap"
                >
                  Interior Designers in {loc}
                </Link>
                {i < localities.length - 1 && (
                  <span aria-hidden="true" className="text-ivory/15">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom row — copyright + GST | back to top ── */}
        <div className="pt-6 border-t border-ivory/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 text-[12px] text-ivory/45">
            <p>© {new Date().getFullYear()} | Touché</p>
            <span aria-hidden="true" className="hidden md:inline text-ivory/20">·</span>
            <p className="tracking-wide">GSTIN — 29ABCDE1234F1Z5</p>
            <span aria-hidden="true" className="hidden md:inline text-ivory/20">·</span>
            <p>All rights reserved.</p>
          </div>

          <a
            href="#top"
            aria-label="Back to top"
            className="self-start md:self-auto inline-flex items-center justify-center w-10 h-10 rounded-full border border-ivory/15 text-ivory/75 hover:text-ink hover:bg-ivory hover:border-ivory transition-colors duration-500"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
