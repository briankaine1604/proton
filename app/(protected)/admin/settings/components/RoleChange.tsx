// components/RoleSelect.tsx
"use client";

import { UserRole } from "@prisma/client";
import { useState, useTransition } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust the import path based on your project structure
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { UpdateUserRole } from "./server/update-user";

// Define role options
const roleOptions = Object.values(UserRole).map((role) => ({
  label: role,
  value: role,
}));

type RoleSelectProps = {
  currentRole: UserRole;
  userId: string;
};

const RoleSelect: React.FC<RoleSelectProps> = ({ currentRole, userId }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole); // Local state for selected role
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole); // Update local state

    startTransition(async () => {
      try {
        const updatedUser = await UpdateUserRole({
          userId,
          userRole: newRole,
        });

        if (updatedUser.error) {
          toast.error("Failed to update role.");
        } else {
          toast.success("Role updated successfully");
        }
      } catch (error) {
        toast.error("Error updating user role.");
      } finally {
        window.location.reload();
      }
    });
  };

  return (
    <Select value={selectedRole} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        {roleOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoleSelect;
