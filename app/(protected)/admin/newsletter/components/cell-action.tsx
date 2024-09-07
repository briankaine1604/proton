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
import { NewsletterColumn } from "./columns";

interface CellActionProps {
  data: NewsletterColumn;
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
  const onDelete = async () => {};
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
              router.push(`/admin/blog/${data.id}`);
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
