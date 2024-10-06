import { Footer } from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6 py-40">
        <div className="text-center">
          <Image
            src="/404.png"
            alt="404 - Not Found"
            className="mx-auto mb-6"
            width={400}
            height={300}
          />

          <p className="mt-4 text-lg text-gray-600">
            We couldn&apos;t find the page you were looking for.
          </p>
          <p className="text-gray-500">
            But don&apos;t worry, you can navigate back to safety.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-8 py-3 bg-[#820001] text-white font-semibold rounded-md shadow-md hover:bg-opacity-90 transition ease-in-out duration-200"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
