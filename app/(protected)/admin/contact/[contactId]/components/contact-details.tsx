"use client";
import PathTrail from "@/components/Breadcrumb";
import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { Info, Mail, Phone, FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";

// Define the contactForm type
type contactForm = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  attachment: string | null;
  createdAt: Date;
  status: "PENDING" | "REVIEWED" | "RESPONDED";
  reviewers: Reviewer[];
};

type Reviewer = {
  id: string;
  userId: string;
  contactFormId: string;
  createdAt: Date;
  user: {
    name: string | null;
  };
};

// Define the props interface
interface ContactDetailsProps {
  initialData: contactForm;
}

const formatDate = (date: Date) => {
  return format(new Date(date), "dd/MM/yyyy");
};

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full px-2 py-1">
            Pending
          </span>
        );
      case "REVIEWED":
        return (
          <span className=" bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full px-2 py-1">
            Reviewed
          </span>
        );
      case "RESPONDED":
        return (
          <span className=" bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-2 py-1">
            Responded
          </span>
        );
      default:
        return (
          <span className=" bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full px-2 py-1">
            Unknown
          </span>
        );
    }
  };

  const updateStatusToResponded = async () => {
    if (currentUser?.id) {
      window.location.href = `mailto:${initialData.email}?subject=Response to Your Inquiry&body=Dear ${initialData.name},\n\n...`;
      try {
        await axios.patch(`/api/contact/${initialData.id}/update-status`, {
          status: "RESPONDED",
          userId: currentUser.id,
        });
      } catch (error) {
        console.error("Failed to update status to RESPONDED", error);
      }
    }
  };

  return (
    <Container>
      <PathTrail />
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2 border-gray-200">
          Contact Details
        </h2>
        <div className="mb-6">
          <p className="text-gray-700 flex items-center mb-2">
            <Mail className="w-5 h-5 mr-3 text-blue-600" />
            <strong className="text-gray-800">Email:</strong>{" "}
            <span className="text-gray-600 ml-2">{initialData.email}</span>
          </p>
          {initialData.phone && (
            <p className="text-gray-700 flex items-center mb-2">
              <Phone className="w-5 h-5 mr-3 text-green-600" />
              <strong className="text-gray-800">Phone:</strong>{" "}
              <span className="text-gray-600 ml-2">{initialData.phone}</span>
            </p>
          )}
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <p className="text-gray-700 flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-3 text-yellow-600" />
            <strong className="text-gray-800">Submitted on:</strong>{" "}
            <span className="text-gray-600 ml-2">
              {formatDate(initialData.createdAt)}
            </span>
          </p>
          <p className="text-gray-700 flex items-center mb-2">
            <Info className="w-5 h-5 mr-3 text-gray-600" />
            <strong className="text-gray-800">Status:</strong>{" "}
            <span className="text-gray-600 ml-2">
              {getStatusLabel(initialData.status)}
            </span>
          </p>
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <p className="text-gray-800 font-semibold mb-2">Message:</p>
          <p className="text-gray-600 whitespace-pre-line">
            {initialData.message}
          </p>
        </div>

        {initialData.attachment && (
          <div className="mt-4">
            <p className="text-gray-700 flex items-center mb-2">
              <FileText className="w-5 h-5 mr-3 text-purple-600" />
              <strong className="text-gray-800">Attachment:</strong>
            </p>
            <a
              href={initialData.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              View Attachment
            </a>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={updateStatusToResponded}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Respond to Email
          </button>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-5">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200">
          Reviewers
        </h3>
        {initialData.reviewers.length > 0 ? (
          <ul className="space-y-4">
            {initialData.reviewers.map((reviewer) => (
              <li
                key={reviewer.id}
                className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-gray-700 font-semibold">
                    Reviewed By:{" "}
                    <span className="text-gray-800">
                      {reviewer.user.name || "Unknown"}
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Reviewer ID:{" "}
                    <span className="text-gray-600">{reviewer.userId}</span>
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  Reviewed on:{" "}
                  <span className="text-gray-600">
                    {formatDate(reviewer.createdAt)}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviewers assigned yet.</p>
        )}
      </div>
    </Container>
  );
};
