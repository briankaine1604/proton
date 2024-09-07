import Container from "@/components/MaxWidthWrapper";
import { ContactForm } from "./components/form";

const ContactPage = () => {
  return (
    <main className="bg-gradient-to-b via-[#f7f8fa] to-white from-[#e2e8f0]">
      <Container>
        {/* Hero Section */}
        <section className="py-12 pt-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            We&apos;d love to hear from you! Fill out the form below or reach us
            through any of the following methods.
          </p>
        </section>

        {/* Contact Information and Form */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="p-8 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="text-left">
              <div className="flex items-center mb-4">
                <span className="mr-2">📍</span>
                <p className="text-gray-600">Our Office</p>
              </div>
              <p className="text-gray-800 mb-2">
                3, Jemide Avenue off Giwa Amu, Airport Road, Benin City, Edo
                state.
              </p>

              <div className="flex items-center mb-4">
                <span className="mr-2">📞</span>
                <p className="text-gray-600">Phone: +234 706 785 0835</p>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2">✉️</span>
                <p className="text-gray-600">
                  Email: info@protonrealestate.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </section>

        {/* Hours of Operation */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Hours of Operation
          </h2>
          <div className="bg-[#820001] p-6 rounded-lg shadow-lg mx-auto max-w-md text-white">
            <div className="flex flex-col space-y-4 text-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Monday - Friday:</span>
                <span>9 AM - 6 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Saturday:</span>
                <span>10 AM - 4 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default ContactPage;
