export type Service = {
  id: string;
  num: string;
  title: string;
  short: string;
  description: string;
  scope: string[];
};

export const services: Service[] = [
  {
    id: "residential",
    num: "01",
    title: "Residential Design",
    short:
      "Considered private homes shaped around how you live, host and rest.",
    description:
      "From a single drawing room to a four-storey home, we approach every residence as a personal portrait. Material palettes, layouts and lighting are tuned to the rhythm of your day.",
    scope: [
      "Concept and mood direction",
      "Layout and space planning",
      "Material, finish and lighting selection",
      "Custom joinery and millwork",
      "FF&E curation and styling",
    ],
  },
  {
    id: "commercial",
    num: "02",
    title: "Commercial Interiors",
    short:
      "Showrooms, lounges, offices and ateliers that elevate brand and experience.",
    description:
      "Spaces that translate brand strategy into proportion, finish and atmosphere. Our commercial interiors balance occupancy, flow and the long quiet detail.",
    scope: [
      "Brand-led concept design",
      "Workplace and retail planning",
      "Lighting and acoustic design",
      "Branded environments and signage",
      "Project handover and snagging",
    ],
  },
  {
    id: "turnkey",
    num: "03",
    title: "Turnkey Execution",
    short:
      "End-to-end delivery — from first sketch to the last cushion in place.",
    description:
      "A single point of accountability across design, procurement, site execution and styling. We hand over a space ready to be lived in, not just walked into.",
    scope: [
      "Design development and BOQ",
      "Vendor and contractor management",
      "On-site supervision and quality",
      "Procurement and logistics",
      "Pre-handover styling",
    ],
  },
  {
    id: "planning",
    num: "04",
    title: "Space Planning",
    short:
      "Spatial choreography rooted in proportion, light and quiet movement.",
    description:
      "Whether you are renovating or building from the ground up, we shape rooms that breathe — with sightlines, ceiling heights and circulation that age beautifully.",
    scope: [
      "Site studies and audits",
      "Massing and zoning strategy",
      "Furniture and flow planning",
      "Daylight and view analysis",
      "Detailed working drawings",
    ],
  },
  {
    id: "modular",
    num: "05",
    title: "Modular Furniture",
    short:
      "Bespoke modular systems — wardrobes, kitchens, vanities and beyond.",
    description:
      "Modular thinking, atelier finish. We design and deliver storage and joinery that fits the millimetre, not the catalogue.",
    scope: [
      "Wardrobes and walk-ins",
      "Modular kitchens",
      "Studies, libraries and TV units",
      "Bath vanities and storage",
      "Veneer, lacquer and stone finishes",
    ],
  },
  {
    id: "consultation",
    num: "06",
    title: "Consultation",
    short:
      "Strategic design counsel — a single room, a renovation, or a master plan.",
    description:
      "Direct studio time with our principal designer. For owners and developers who need clarity, edit and direction before committing to a full engagement.",
    scope: [
      "Site walkthrough and brief",
      "Mood and material direction",
      "Layout sketch and feedback",
      "Vendor and contractor referrals",
      "Written design recommendation",
    ],
  },
];
