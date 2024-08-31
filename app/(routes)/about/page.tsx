"use client";
import React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/MaxWidthWrapper";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <motion.section
    className="my-16 text-left"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-l-4 border-blue-500 pl-4">
      {title}
    </h2>
    <div className="text-xl text-gray-700 leading-relaxed">{children}</div>
  </motion.section>
);

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen bg-[#f7f8fa] text-lg py-20">
      <Container>
        {/* 1. Introduction to Your Brand */}
        <motion.main
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Proton
          </h1>
          <p className="text-2xl text-black/70 max-w-2xl mx-auto">
            Leading the Charge in Eco-Friendly Real Estate
          </p>
        </motion.main>

        {/* 2. Mission Statement */}
        <Section title="Our Mission">
          <p>
            At Proton, we are committed to revolutionizing real estate in Africa
            by creating sustainable developments that inspire new lifestyles and
            contribute to a better future.
          </p>
        </Section>

        {/* 3. Vision Statement */}
        <Section title="Our Vision">
          <p>
            We envision a future where every home in Africa is a beacon of
            sustainability, technology, and comfort. Our goal is to make this a
            reality through innovative and eco-friendly practices.
          </p>
        </Section>

        {/* 4. Core Values */}
        <Section title="Our Core Values">
          <p>
            Our core values of integrity, innovation, and sustainability guide
            everything we do. We strive to deliver exceptional results while
            making a positive difference in the world.
          </p>
        </Section>

        {/* 5. Company History */}
        <Section title="Our Journey">
          <p>
            Proton started with a vision to transform real estate in Africa.
            Over the years, we&apos;ve achieved key milestones, including the
            development of sustainable housing projects and the expansion of our
            services across the continent.
          </p>
        </Section>

        {/* 6. Leadership Team */}
        <Section title="Meet Our Leaders">
          <p>
            Our leadership team consists of experienced professionals who are
            passionate about real estate and sustainability. They bring a wealth
            of knowledge and expertise to Proton, driving our mission forward.
          </p>
        </Section>

        {/* 7. Commitment to Sustainability */}
        <Section title="Our Commitment to Sustainability">
          <p>
            Sustainability is at the heart of everything we do. We use renewable
            materials, reduce waste, and incorporate green technologies in all
            our projects, ensuring a positive impact on the environment.
          </p>
        </Section>

        {/* 8. Client Testimonials */}
        <Section title="What Our Clients Say">
          <p>
            &quot;Proton&apos;s commitment to sustainability and innovation is
            truly inspiring. Our experience with their team has been nothing
            short of exceptional.&quot; - John Doe, Happy Client
          </p>
          <p>
            &quot;The projects developed by Proton are not only eco-friendly but
            also beautifully designed. We&apos;re thrilled with the
            results!&quot; - Jane Smith, Satisfied Partner
          </p>
        </Section>

        {/* 9. Future Goals */}
        <Section title="Looking Ahead">
          <p>
            We&apos;re excited about the future and have several projects in the
            pipeline that will further our mission of creating sustainable
            developments. Stay tuned for more updates!
          </p>
        </Section>

        {/* 10. Social Responsibility */}
        <Section title="Giving Back to the Community">
          <p>
            Proton is dedicated to giving back to the communities we serve. We
            support various social and charitable initiatives that align with
            our values and help create a better future for everyone.
          </p>
        </Section>

        {/* 11. Call to Action */}
        <Section title="Join Us in Shaping the Future">
          <p>
            We invite you to join us in shaping the future of real estate in
            Africa. Whether you&apos;re a potential client, partner, or simply
            interested in learning more about our work, we&apos;d love to hear
            from you.
          </p>
          <Link href="/contact" className="inline-block mt-4 text-blue-600">
            Contact Us
          </Link>
        </Section>

        {/* 12. Contact Information */}
        <Section title="Get in Touch">
          <p>Email: info@proton.com</p>
          <p>Phone: 07067850835</p>
          <p>Office Address: 1234 Proton Avenue, Lagos, Nigeria</p>
        </Section>
      </Container>
    </section>
  );
}
