"use client";
import { DeleteImage } from "@/actions/deleteImage";
import Tiptap from "@/components/blog/Tiptap";
import Container from "@/components/MaxWidthWrapper";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Project } from "@prisma/client";

import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreateProject } from "../../components/server/create-project";
import { CurrencyInputter } from "@/components/currencyInput";
import { UpdateProject } from "../../components/server/update-project";
import PathTrail from "@/components/Breadcrumb";
import { Loader2 } from "lucide-react";

interface ProjectType {
  id: string;
  address?: string | null;
  name: string;
  description: string;
  price?: number | null;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  inStock: boolean;
}

// Define types
interface ProjectProps {
  initialData?: (ProjectType & { images: Image[] }) | null;
}

// Validation schema for the form
export const ProjectSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.number().nullable(),
  description: z.string().min(1),
  address: z.string().nullable(),
  inStock: z.boolean().default(false).optional(),
});

export const ProjectForm = ({ initialData }: ProjectProps) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ url: string }[]>(
    initialData?.images || []
  );
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit Project" : "Create Project";
  const description = initialData ? "Edit your project" : "Add a new project";
  const toastMessage = initialData ? "Project updated" : "Project created";

  const initialValues = initialData
    ? {
        name: initialData.name,
        address: initialData.address || "",
        images: initialData.images.map((img) => ({ url: img.url })),
        price: initialData.price ? parseFloat(initialData.price.toString()) : 0,
        description: initialData.description,
        inStock: initialData.inStock || false,
      }
    : {
        name: "",
        address: "",
        images: [],
        price: 0,
        description: "",
        inStock: false,
      };

  const form = useForm<z.infer<typeof ProjectSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialValues,
  });

  const onDelete = async () => {};

  const deleteImage = async (imageUrl: string) => {
    DeleteImage(imageUrl).then((res) => {
      if (res.success) {
        toast.success(res.success);
        setImages(images.filter((image) => image.url !== imageUrl));
        form.setValue(
          "images",
          images.filter((image) => image.url !== imageUrl)
        );
      } else if (res.error) {
        toast.error(res.error);
      }
    });
  };

  const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
    setIsLoading(true); // Move outside of startTransition for immediate state update

    try {
      if (initialData) {
        const res = await UpdateProject({ id: initialData.id, values: data });
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.push("/admin/project");
          router.refresh();
        }
      } else {
        const res = await CreateProject(data);
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.push("/admin/project");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Always reset isLoading state after async operations
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Project name"
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Project address"
                        value={field.value || ""}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyInputter
                        {...field}
                        placeholder="Project price"
                        value={field.value?.toString() || ""}
                        onChange={(value) => {
                          // value is the string or undefined passed from CurrencyInputter
                          field.onChange(value ? parseFloat(value) : 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!images.length && (
                <div className="p-6 bg-gray-50 rounded-lg border border-dashed">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadDropzone
                            endpoint="mediaPost"
                            onClientUploadComplete={(res) => {
                              const newImages = res.map((file) => ({
                                url: file.url,
                              }));
                              setImages([...images, ...newImages]);
                              form.setValue("images", [
                                ...images,
                                ...newImages,
                              ]);
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

              {images.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {images.map((image) => (
                    <div key={image.url} className="relative">
                      <NextImage
                        src={image.url}
                        alt="Uploaded Cover Image"
                        width={200}
                        height={150}
                        className="rounded-lg object-cover"
                      />
                      <Button
                        variant="outline"
                        onClick={() => deleteImage(image.url)}
                        className="absolute top-2 right-2"
                        type="button"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tiptap content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>In stock</FormLabel>
                      <FormDescription>
                        This will specify if project is instock or not
                      </FormDescription>
                    </div>
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
