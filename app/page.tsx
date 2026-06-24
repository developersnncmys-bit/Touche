import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import PhilosophySection from "@/components/PhilosophySection";
import ContactCTA from "@/components/ContactCTA";
import EnquiryCTA from "@/components/EnquiryCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PhilosophySection />
      <FeaturedProject />
      <ContactCTA />
      <EnquiryCTA />
    </>
  );
}
