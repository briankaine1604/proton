"use client";
import { DeleteImage } from "@/actions/deleteImage";
import Tiptap from "@/components/blog/Tiptap";
import Container from "@/components/MaxWidthWrapper";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogPost } from "@prisma/client";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface BlogPostProps {
  initialData: BlogPost | null;
}

export const BlogSchema = z.object({
  title: z.string().min(1),
  coverImage: z.string(),
  content: z.string().min(1),
  published: z.boolean().default(false).optional(),
});

export const BlogForm = ({ initialData }: BlogPostProps) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(initialData?.coverImage || "");
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit Blog Post" : "Create Blog Post";
  const description = initialData
    ? "Edit your blog post"
    : "Add a new blog post";
  const toastMessage = initialData ? "Blog post updated" : "Blog post created";

  const form = useForm<z.infer<typeof BlogSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(BlogSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      coverImage: "",
      published: false,
    },
  });

  const onDelete = async () => {};

  const deleteImage = async () => {
    DeleteImage(image).then((res) => {
      if (res.success) {
        toast.success(res.success);
        setImage("");
        form.setValue("coverImage", "");
      } else if (res.error) {
        toast.error(res.error);
      }
    });
  };

  const onSubmit = (data: z.infer<typeof BlogSchema>) => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        isLoading={isPending}
        onConfirm={onDelete}
      />
      <Container>
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        name="title"
                        placeholder="Blog title"
                        className="border-none max-w-6xl text-2xl h-[50px] bg-gray-100 rounded-lg"
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
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              const imageUrl = res[0].url;
                              setImage(imageUrl);
                              form.setValue("coverImage", imageUrl);
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
                      alt="Uploaded Cover Image"
                      width={600}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={deleteImage}
                    className="self-center"
                    type="button"
                  >
                    Remove image
                  </Button>
                </div>
              )}

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tiptap content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" className="mt-4 w-[100px]">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </>
  );
};
