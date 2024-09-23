import Link from "next/link";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-5">
      <div className="max-w-md text-center bg-white bg-opacity-30 backdrop-blur-md border border-gray-200 rounded-lg p-8 shadow-lg">
        <p className="text-gray-800 mb-6">
          This section is currently empty. We&apos;re working on something
          special. Check back soon!
        </p>
        <Link href="/#newsletter">
          <button className="bg-[#820001] text-white font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300">
            Subscribe for Updates
          </button>
        </Link>
      </div>
    </div>
  );
};
