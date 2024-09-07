import { About } from "@/components/home-page/about-us";
import { Blogs } from "@/components/home-page/blogs";
import { ContactUs } from "@/components/home-page/contact-us";
import { Hero } from "@/components/home-page/hero";
import { Newsletter } from "@/components/home-page/newletter";
import { ProjectsList } from "@/components/home-page/projects";
import { Services } from "@/components/home-page/services";
import { TeamsList } from "@/components/home-page/team";
import { VideoLinksSection } from "@/components/home-page/videolink";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <Services />
      <ProjectsList />
      <ContactUs />
      <TeamsList />
      <Blogs />
      <VideoLinksSection />
      <Newsletter />
    </div>
  );
}
