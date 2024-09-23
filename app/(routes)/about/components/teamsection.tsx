"use client";

import { getTeams } from "@/actions/get-teams";
import { Team } from "@/types";
import { Description, Dialog, DialogTitle } from "@headlessui/react"; // Headless UI for the modal
import Image from "next/image";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/emptystate"; // Import EmptyState

const Skeleton = () => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 animate-pulse">
    <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-16 mx-auto mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
  </div>
);

export const TeamSection = () => {
  const [team, setTeam] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Team | null>(null); // To handle modal for bio

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeams();
        setTeam(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen w-full py-10 px-5 md:px-10 bg-gray-50 pt-20">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Our Team</h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Our team of dedicated professionals is here to ensure your success. We
          bring together a wealth of experience in real estate, combining
          industry knowledge with a commitment to providing outstanding service.
        </p>
      </header>

      {/* Conditional rendering for EmptyState or grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : team.length === 0 ? (
        <EmptyState /> // Render EmptyState when there are no team members
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                style={{ objectPosition: "center top" }}
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {member.name}
              </h2>
              <p className="text-center text-gray-500">{member.role}</p>
              <p className="mt-4 text-gray-600 text-center text-sm">
                {member.bio && member.bio.length > 100
                  ? `${member.bio.substring(0, 100)}...`
                  : member.bio}
              </p>
              {member.bio && member.bio.length > 100 && (
                <button
                  onClick={() => setSelectedMember(member)}
                  className="text-blue-600 hover:underline text-sm block mx-auto mt-2"
                >
                  Read Full Bio
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Full Bio Modal */}
      {selectedMember && (
        <Dialog
          open={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-black bg-opacity-50 fixed inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full p-6 z-10 relative">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {selectedMember.name}
            </DialogTitle>
            <Description className="text-gray-600 mt-2">
              {selectedMember.role}
            </Description>
            <p className="mt-4 text-gray-600">{selectedMember.bio}</p>
            <button
              onClick={() => setSelectedMember(null)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
};
