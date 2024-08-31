"use client";
import React, { useState } from "react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { addSubscriber } from "@/actions/add-subscriber";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

type Props = {};

export function Newsletter({}: Props) {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formSchema = z.object({
    email: z.string().min(1).email("Invalid email format"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submitting form", data);
    startTransition(() => {
      addSubscriber(data)
        .then((data) => {
          if (data?.error) {
            setErrorMessage(data.error);
            setSuccessMessage(null);
            console.log("Subscription error:", data.error);
          } else if (data?.success) {
            setSuccessMessage(data.success);
            setErrorMessage(null);
            form.reset();
            console.log("Subscription success:", data.success);
          }
        })
        .catch(() => console.log("Something went wrong"));
    });
  };

  return (
    <div className="bg-white py-10">
      <Container className="text-black">
        <div className="bg-gradient-to-r from-[#820001] to-[#630d0d] h-auto sm:h-[250px] w-full p-6 flex flex-wrap rounded-lg items-center justify-center gap-5">
          <article className="max-w-full sm:max-w-[500px] text-center sm:text-left">
            <Heading className="text-xl sm:text-2xl pb-4 text-white">
              Subscribe to Our Newsletter
            </Heading>
            <span className="text-sm sm:text-lg text-white">
              Get the latest listings, market trends, and exclusive offers
              delivered straight to your inbox!
            </span>
          </article>
          <div className="w-full sm:w-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row justify-center mt-4 sm:mt-0"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          className="text-black px-4 py-3 w-full sm:w-auto sm:min-w-[250px] border-2 border-[#820001]/50 focus:border-[#820001] focus:ring-0 focus:outline-none transition-shadow rounded-t-md sm:rounded-l-lg sm:rounded-r-none"
                          placeholder="Enter your email address"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button
                  disabled={isPending}
                  className="bg-[#820001] text-white px-6 py-3 text-sm rounded-b-md sm:rounded-r-lg sm:rounded-l-none hover:bg-red-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-2">
                {successMessage && <FormSuccess message={successMessage} />}
                {errorMessage && <FormError message={errorMessage} />}
              </div>
            </Form>
            <p className="text-xs text-center mt-3 text-white">
              By subscribing, you agree to our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
