"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import Container from "@/components/MaxWidthWrapper";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DeleteImage } from "@/actions/deleteImage";
import axios from "axios";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  attachment: z.string().optional(),
});

export const ContactForm = () => {
  const [file, setFile] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      attachment: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    setIsLoading(true);
    try {
      // Send the form data to the API endpoint
      const res = await axios.post("/api/contact", data);

      // Check if the submission was successful
      if (res.status === 200) {
        setSuccess("Form submitted successfully!");
        // console.log("Form data:", data);
        form.reset();
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit form", error);
      setError("Something went wrong submitting the form");
    }
    setIsLoading(false);
  };

  const removeFile = async () => {
    DeleteImage(file).then((res) => {
      if (res.success) {
        toast.success(res.success);
        setFile(""); // Reset file state
        setFileName(""); // Reset fileName state
        form.setValue("attachment", ""); // Reset attachment field in form
      } else if (res.error) {
        toast.error(res.error);
      }
    });
  };

  const renderFilePreview = () => {
    if (!file) {
      return (
        <div className="p-6 bg-gray-50 rounded-lg border border-dashed transition hover:border-solid hover:border-gray-300">
          <FormField
            control={form.control}
            name="attachment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Attachment (optional)
                </FormLabel>
                <FormControl>
                  <UploadButton
                    endpoint="fileUploader"
                    appearance={{
                      button: {
                        background: "#820001",
                      },
                    }}
                    content={{
                      allowedContent({ ready }) {
                        if (ready) return ".pdf, .docx  or image (4MB Max)";
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      const fileUrl = res[0].url;
                      const fileName = res[0].name;
                      setFile(fileUrl);
                      setFileName(fileName);
                      form.setValue("attachment", fileUrl);
                      toast.success("Upload completed");
                    }}
                    onUploadError={(error: Error) => {
                      toast.error("Upload failed");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    }

    const fileType =
      file?.split(".").pop()?.toUpperCase() || "Unknown File Type";
    const displayFileName = fileName || "Unnamed File";

    return (
      <div className="p-4 bg-gray-100 rounded-lg border flex items-center space-x-4">
        <span className="font-bold">{fileType}</span>
        <span>{displayFileName}</span>
        <button
          type="button"
          onClick={removeFile}
          className="text-red-500 hover:text-red-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your name"
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your email"
                    type="email"
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your phone number"
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Your message"
                    className="rounded-lg min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Upload */}
          {/* {renderFilePreview()} */}

          <FormSuccess message={success} />
          <FormError message={error} />

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-4 flex items-center gap-x-2 w-full"
          >
            <span>Submit</span>
            {isLoading && <Loader2 className=" animate-spin size-4" />}
          </Button>
        </form>
      </Form>
    </Container>
  );
};
