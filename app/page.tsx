import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { History } from "@/components/sections/History";
import { Members } from "@/components/sections/Members";
import { Stats } from "@/components/sections/Stats";
import { Calendar } from "@/components/sections/Calendar";
import { Support } from "@/components/sections/Support";
import { Sponsors } from "@/components/sections/Sponsors";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <History />
        <Members />
        <Stats />
        <Calendar />
        <Support />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
