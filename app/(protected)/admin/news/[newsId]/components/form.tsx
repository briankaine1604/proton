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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Container from "@/components/MaxWidthWrapper";
import { useRouter } from "next/navigation";
import PathTrail from "@/components/Breadcrumb";
import { Textarea } from "@/components/ui/textarea";

const NewsSchema = z.object({
  link: z.string().nullable().optional(), // Allowing null values
  content: z.string().min(1),
});

export const LinkForm = ({
  initialData,
}: {
  initialData?: {
    id: string;
    link: string | null;
    content: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof NewsSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      link: initialData?.link || "", // Handle potential null
      content: initialData?.content,
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof NewsSchema>) => {
    setIsLoading(true);

    try {
      if (initialData) {
        await axios.patch(`/api/news/${initialData.id}`, data);
        toast.success("Link updated successfully");
      } else {
        await axios.post("/api/news", data);
        toast.success("News saved successfully");
      }

      router.push("/admin/news");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save news");
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Add content here" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add link here"
                    value={field.value || ""}
                  />
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
