"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import NextImage from "next/image";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/MaxWidthWrapper";
import { DeleteImage } from "@/actions/deleteImage";
import { useRouter } from "next/navigation";
import PathTrail from "@/components/Breadcrumb";

const LinkSchema = z.object({
  link: z.string().min(1, "Name is required"),
});

export const LinkForm = ({
  initialData,
}: {
  initialData?: {
    id: string;
    link: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LinkSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(LinkSchema),
    defaultValues: initialData || {
      link: "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof LinkSchema>) => {
    setIsLoading(true);

    try {
      // Check if there is an ID in the data to determine if it's an update (PATCH) or a new entry (POST)
      if (initialData) {
        await axios.patch(`/api/link/${initialData.id}`, data);
        toast.success("Link updated successfully");
      } else {
        await axios.post("/api/link", data);
        toast.success("Link saved successfully");
      }

      router.push("/admin/link");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PathTrail />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Add link here" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4 w-[100px] flex items-center gap-x-2"
            >
              <span>Save</span>
              {isLoading && <Loader2 className="animate-spin size-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  );
};
