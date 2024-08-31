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

const TeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional().nullable(),
  image: z.string().optional(),
  role: z.string().min(1, "Role is required"),
});

export const TeamMemberForm = ({
  initialData,
}: {
  initialData?: {
    name: string;
    bio?: string | null;
    image?: string;
    role: string;
  };
}) => {
  const [image, setImage] = useState(initialData?.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof TeamMemberSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: initialData || {
      name: "",
      bio: "",
      image: "",
      role: "",
    },
  });

  const handleImageDelete = async () => {
    try {
      await DeleteImage(image);
      setImage("");
      form.setValue("image", "");
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const handleFormSubmit = async (data: z.infer<typeof TeamMemberSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/team", { ...data, image });
      toast.success("Team member saved successfully");
      router.push("/admin/team");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save team member");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Team member name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Team member role" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || " "}
                    placeholder="Short bio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!image && (
            <div className="p-6 bg-gray-50 rounded-lg border border-dashed">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          const imageUrl = res[0].url;
                          setImage(imageUrl);
                          form.setValue("image", imageUrl);
                          toast.success("Upload completed");
                        }}
                        onUploadError={(error: Error) => {
                          toast.error("Image upload failed");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {image && (
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center">
                <NextImage
                  src={image}
                  alt="Uploaded Image"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
              <Button
                variant="outline"
                onClick={handleImageDelete}
                className="self-center"
                type="button"
              >
                Remove image
              </Button>
            </div>
          )}

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
