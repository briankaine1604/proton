// app/faq/page.tsx

import { FAQS } from "@/types";
import { getFAQs } from "@/actions/get-FAQs";
import FAQClient from "./faq-client";

const FAQPage = async (): Promise<JSX.Element> => {
  const faqs: FAQS[] = await getFAQs();

  return <FAQClient faqs={faqs} />;
};

export default FAQPage;
