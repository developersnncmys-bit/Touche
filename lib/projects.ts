export type ProjectCategory = "Residential" | "Commercial" | "Turnkey";

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  year: number;
  location: string;
  image: string;
  description: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "p01",
    title: "Maison Indira",
    slug: "maison-indira",
    category: "Residential",
    year: 2025,
    location: "Indiranagar, Bangalore",
    image: "/featured/img1.png",
    description:
      "A 4,200 sq.ft. private residence layered in travertine, oak and brushed brass.",
    featured: true,
  },
  {
    id: "p02",
    title: "Atelier Brera",
    slug: "atelier-brera",
    category: "Commercial",
    year: 2024,
    location: "UB City, Bangalore",
    image: "/featured/img2.png",
    description:
      "A flagship retail atelier composed of fluted walnut, hand-troweled lime plaster and warm uplight.",
  },
  {
    id: "p03",
    title: "Casa Sereno",
    slug: "casa-sereno",
    category: "Residential",
    year: 2024,
    location: "Whitefield, Bangalore",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    description:
      "A serene family home reimagined through proportion, light and tactile neutrals.",
  },
  {
    id: "p04",
    title: "The Quiet Lounge",
    slug: "the-quiet-lounge",
    category: "Commercial",
    year: 2025,
    location: "ITC Gardenia, Bangalore",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1600&q=80",
    description:
      "Hospitality lounge concept blending European restraint with Indian craft heritage.",
  },
  {
    id: "p05",
    title: "Villa Rivière",
    slug: "villa-riviere",
    category: "Turnkey",
    year: 2024,
    location: "Kanakapura Road, Bangalore",
    image: "/featured/img3.png",
    description:
      "A turnkey villa delivery — from masterplan to last cushion — over 16 months.",
  },
  {
    id: "p06",
    title: "Studio Noir",
    slug: "studio-noir",
    category: "Commercial",
    year: 2023,
    location: "Koramangala, Bangalore",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    description:
      "A creative agency headquarters defined by smoked oak and concrete patina.",
  },
  {
    id: "p07",
    title: "Penthouse Marbré",
    slug: "penthouse-marbre",
    category: "Residential",
    year: 2025,
    location: "Lavelle Road, Bangalore",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    description:
      "A penthouse interior centered on a continuous calacatta vein and floor-to-ceiling glass.",
  },
  {
    id: "p08",
    title: "House of Linen",
    slug: "house-of-linen",
    category: "Turnkey",
    year: 2023,
    location: "Sadashivanagar, Bangalore",
    image:
      "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=1600&q=80",
    description:
      "Soft, layered residential turnkey project rooted in linen, cane and warm whites.",
  },
  {
    id: "p09",
    title: "The Banyan Suite",
    slug: "the-banyan-suite",
    category: "Commercial",
    year: 2024,
    location: "Bangalore International Airport",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
    description:
      "A premium airline lounge interior crafted to evoke calm transit and Indian hospitality.",
  },
  {
    id: "p10",
    title: "Ardoise Residence",
    slug: "ardoise-residence",
    category: "Residential",
    year: 2023,
    location: "Jayanagar, Bangalore",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    description:
      "A graphite-and-bone residence layered in slate, oak and parchment plaster.",
  },
  {
    id: "p11",
    title: "Maison Verte",
    slug: "maison-verte",
    category: "Turnkey",
    year: 2025,
    location: "Devanahalli, Bangalore",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    description:
      "A countryside turnkey home shaped around courtyards, water and rough-hewn stone.",
  },
  {
    id: "p12",
    title: "The Tailor House",
    slug: "the-tailor-house",
    category: "Commercial",
    year: 2024,
    location: "Brigade Road, Bangalore",
    image:
      "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?auto=format&fit=crop&w=1600&q=80",
    description:
      "A bespoke menswear atelier dressed in tobacco leather, smoked mirror and walnut.",
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
