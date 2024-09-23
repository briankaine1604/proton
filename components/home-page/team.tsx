"use client";
import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import { Button } from "../ui/button";
import Image from "next/image";
import { Team as TeamType } from "@/types";
import { getTeams } from "@/actions/get-teams";

type Props = {
  teamMembers: TeamType[];
};

export function TeamsList() {
  const [teams, setTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const teamList = await getTeams();

        setTeams(teamList);
      } catch (error) {
        console.error("Failed to fetch team:", error);
      }
    };

    fetchProjects();
  }, []);

  return <Team teamMembers={teams} />;
}

function Team({ teamMembers }: Props) {
  return (
    <div className="w-full min-h-screen py-20 bg-gradient-to-b via-[#f7f8fa] to-white from-[#e2e8f0]">
      <Container>
        <div className="text-center mb-12">
          <Heading className="text-4xl font-bold mb-8">Meet the Team</Heading>

          <div className="flex justify-center items-center mb-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-md"
                style={{
                  zIndex: teamMembers.length - index,
                  marginLeft: index > 0 ? "-1.5rem" : "0",
                }}
              >
                <Image
                  src={member.image}
                  alt={`Team member ${index + 1}`}
                  fill
                  objectFit="cover"
                />
              </div>
            ))}
          </div>

          <p className="text-black/80 text-lg max-w-2xl mx-auto">
            Our diverse and talented team brings together a blend of expertise,
            creativity, and innovation. Each member is dedicated to delivering
            exceptional results that exceed expectations. We are committed to
            making a meaningful impact on every project we undertake.
          </p>

          <div className="mt-12">
            <Button variant={"inverted"}>
              <span>View Full Team</span>
              <MoveRight className="ml-2" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
