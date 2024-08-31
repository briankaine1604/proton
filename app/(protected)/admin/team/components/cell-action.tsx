import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState, useTransition } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { toast } from "sonner";
import { DeleteBlog } from "./server/delete-blog";
import { TeamColumn } from "./columns";

interface CellActionProps {
  data: TeamColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("User Id is copied to the keyboard");
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/team/${data.id}`);

      if (response.status === 200) {
        toast.success("Team member deleted");
      } else {
        toast.error("Failed to delete team member");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setOpen(false);

      router.refresh();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        isLoading={isLoading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 p-0 w-8">
            <span className=" sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4" /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/admin/team/${data.id}`);
            }}
          >
            <Edit className="h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
