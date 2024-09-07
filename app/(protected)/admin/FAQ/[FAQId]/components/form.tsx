"use client";

import Tiptap from "@/components/blog/Tiptap";
import PathTrail from "@/components/Breadcrumb";
import Container from "@/components/MaxWidthWrapper";
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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FAQschema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export const FAQform = ({
  initialData,
}: {
  initialData?: {
    id: string;
    question: string;
    answer: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FAQschema>>({
    mode: "onSubmit",
    resolver: zodResolver(FAQschema),
    defaultValues: initialData || {
      question: "",
      answer: "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof FAQschema>) => {
    setIsLoading(true);

    try {
      // Check if there is an ID in the data to determine if it's an update (PATCH) or a new entry (POST)
      if (initialData) {
        await axios.patch(`/api/FAQ/${initialData.id}`, data);
        toast.success("FAQ updated successfully");
      } else {
        await axios.post("/api/FAQ", data);
        toast.success("FAQ saved successfully");
      }

      router.push("/admin/FAQ");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save FAQ");
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
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Add question here" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
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
              {isLoading && <Loader2 className="animate-spin size-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  );
};
