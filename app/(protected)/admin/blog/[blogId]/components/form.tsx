"use client";
import Tiptap from "@/components/blog/Tiptap";
import Container from "@/components/MaxWidthWrapper";
import { AlertModal } from "@/components/modals/alert-modal";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogPost } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateBlog } from "../../components/server/create-blog";
import NextImage from "next/image";
import { UpdateBlog } from "../../components/server/update-blog";
import { DeleteImage } from "@/actions/deleteImage";
import PathTrail from "@/components/Breadcrumb";
import { Select } from "@/components/select";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface BlogPostProps {
  initialData: BlogPost | null;
  onCategoryCreate: (value: string) => void;
  categoryOptions: { label: string; value: string }[];
}

export const BlogSchema = z.object({
  title: z.string().min(1),
  coverImage: z.string(),
  content: z.string().min(1),
  published: z.boolean().default(false).optional(),
  subtitle: z.string().optional().nullable(),
  categories: z.array(z.string()),
});

export const BlogForm = ({
  initialData,
  onCategoryCreate,
  categoryOptions,
}: BlogPostProps) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      subtitle: "",
      categories: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

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

  const onSubmit = async (data: z.infer<typeof BlogSchema>) => {
    setIsLoading(true);
    const blogId = Array.isArray(params.blogId)
      ? params.blogId[0]
      : params.blogId;

    try {
      if (blogId && blogId !== "new") {
        // Update the existing blog post
        const updatedData = { ...data, id: blogId };
        const res = await axios.patch(
          `/api/blogs/by-id/${blogId}`,
          updatedData
        );

        if (res.data.error) {
          toast.error(res.data.error);
          console.error("UpdateBlog Error:", res.data.error);
        } else if (res.data.success) {
          toast.success(res.data.success);
          router.push("/admin/blog");
          router.refresh();
        }
      } else {
        // Create a new blog post
        const res = await CreateBlog(data);

        if (res.error) {
          toast.error(res.error);
          console.error("CreateBlog Error:", res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.push("/admin/blog");
          router.refresh();
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Catch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        isLoading={isLoading}
        onConfirm={onDelete}
      />
      <Container>
        <PathTrail />
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
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="subtitle"
                        className="border-none max-w-6xl h-[50px] bg-gray-100 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="categories"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Select a category"
                        options={categoryOptions}
                        onCreate={onCategoryCreate}
                        value={field.value} // This should be an array of category IDs
                        disabled={isPending}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
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
                <Button
                  type="submit"
                  className="mt-4 w-[100px] flex items-center gap-x-2"
                >
                  <span>Save</span>
                  {isLoading && <Loader2 className=" animate-spin size-4" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </>
  );
};
