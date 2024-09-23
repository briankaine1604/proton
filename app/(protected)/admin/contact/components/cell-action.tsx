import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ContactColumn } from "./columns";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";

interface CellActionProps {
  data: ContactColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("User Id is copied to the clipboard");
  };

  const updateStatusAndAddReviewer = async () => {
    if (data.status === "PENDING" && currentUser?.id) {
      try {
        await axios.patch(`/api/contact/${data.id}/update-status`, {
          status: "REVIEWED",
          userId: currentUser.id,
        });
      } catch (error) {
        console.error("Failed to update status and add reviewer", error);
      }
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/contact/${data.id}`);

      if (response.status === 200) {
        toast.success("Contact deleted");
      } else {
        toast.error("Failed to contact link");
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
          <Button
            variant={"ghost"}
            className="h-8 p-0 w-8"
            disabled={isPending}
          >
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={async () => {
              await updateStatusAndAddReviewer();
              router.push(`/admin/contact/${data.id}`);
            }}
          >
            <Edit className="h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
