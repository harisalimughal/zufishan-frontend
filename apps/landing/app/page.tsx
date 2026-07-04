import { Hero } from "../sections/Hero";
import { Problem } from "../sections/Problem";
import { Solution } from "../sections/Solution";
import { ProductPreview } from "../sections/ProductPreview";
import { ClassroomPreview } from "../sections/ClassroomPreview";
import { Waitlist } from "../sections/Waitlist";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <ProductPreview />
      <ClassroomPreview />
      <Waitlist />
      <Footer />
    </main>
  );
}
