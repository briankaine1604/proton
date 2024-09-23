"use client";
import React from "react";
import {
  Megaphone,
  NotepadText,
  Contact,
  CircleHelp,
  Link2,
  FolderArchive,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import PathTrail from "@/components/Breadcrumb";

const links = [
  {
    id: 1,
    href: "/news",
    name: "News",
    description: "Latest updates and announcements.",
    icon: <Megaphone className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 2,
    href: "/blog",
    name: "Blog",
    description: "Manage blog posts and articles.",
    icon: <NotepadText className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 3,
    href: "/contact",
    name: "Contact List",
    description: "Access and manage contacts forms.",
    icon: <Contact className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 4,
    href: "/FAQ",
    name: "FAQs",
    description: "Frequently asked questions.",
    icon: <CircleHelp className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 5,
    href: "/link",
    name: "External Links",
    description: "Manage external resources.",
    icon: <Link2 className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 6,
    href: "/project",
    name: "Projects",
    description: "Overview of ongoing projects.",
    icon: <FolderArchive className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 7,
    href: "/team",
    name: "Team Members",
    description: "Manage your team.",
    icon: <Users className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 8,
    href: "/settings",
    name: "Settings",
    description: "Change user Roles",
    icon: <Settings className="w-10 h-10 text-blue-500" />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <PathTrail />
      <h1 className="text-4xl font-bold text-center mb-12">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {links.map(({ id, href, name, description, icon }) => (
          <Link href={`/admin${href}`} key={id}>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                {icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {name}
              </h2>
              <p className="text-gray-600 text-center">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
