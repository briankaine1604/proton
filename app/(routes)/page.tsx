import { About } from "@/components/home-page/about-us";
import { ContactUs } from "@/components/home-page/contact-us";
import { Hero } from "@/components/home-page/hero";
import { Newsletter } from "@/components/home-page/newletter";
import { News } from "@/components/home-page/news";
import { ProjectsList } from "@/components/home-page/projects";
import { Services } from "@/components/home-page/services";
import { TeamsList } from "@/components/home-page/team";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <Services />
      <ProjectsList />
      <ContactUs />
      <TeamsList />
      <News />
      <Newsletter />
    </div>
  );
}
