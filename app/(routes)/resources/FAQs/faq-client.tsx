"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FAQS } from "@/types";
import Container from "@/components/MaxWidthWrapper";
import { ChevronDownIcon } from "lucide-react";

interface FAQClientProps {
  faqs: FAQS[];
}

const FAQClient: React.FC<FAQClientProps> = ({ faqs }) => {
  return (
    <main className="bg-gradient-to-b from-[#e2e8f0] via-[#f7f8fa] to-white w-full">
      <Container className="py-20">
        <section className="max-w-3xl mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to some of the most common questions we receive.
            </p>
          </header>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <Disclosure key={faq.id}>
                {({ open }) => (
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md">
                    <DisclosureButton
                      className={`flex justify-between items-center w-full px-6 py-4 text-left border-b border-gray-300 rounded-t-lg transition-all duration-300 ${
                        open
                          ? "bg-[#820001] text-white"
                          : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <h2 className="font-semibold text-lg">{faq.question}</h2>
                      <ChevronDownIcon
                        className={`h-6 w-6 transition-transform duration-300 ${
                          open ? "transform rotate-180" : "text-gray-500"
                        }`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="p-6 bg-gray-50">
                      <article
                        className="prose prose-lg text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default FAQClient;
