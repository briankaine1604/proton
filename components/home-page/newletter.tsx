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
    email: z.string().min(1, "Email is required").email("Invalid email format"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      addSubscriber(data)
        .then((response) => {
          if (response?.error) {
            setErrorMessage(response.error);
            setSuccessMessage(null);
            console.log("Subscription error:", response.error);
          } else if (response?.success) {
            setSuccessMessage(response.success);
            setErrorMessage(null);
            form.reset();
            console.log("Subscription success:", response.success);
          }
        })
        .catch(() => console.log("Something went wrong"));
    });
  };

  return (
    <div className="bg-white py-10">
      <Container className="text-black">
        <div className="bg-gradient-to-r from-[#820001] to-[#630d0d] p-6 py-10 rounded-lg flex flex-col lg:flex-row items-center gap-x-10">
          <article className="text-center lg:text-left max-w-full sm:max-w-[500px]">
            <Heading className="text-xl sm:text-2xl pb-4 text-white">
              Subscribe to Our Newsletter
            </Heading>
            <p className="text-sm sm:text-lg text-white">
              Get the latest listings, market trends, and exclusive offers
              delivered straight to your inbox!
            </p>
          </article>
          <div className="w-full sm:w-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row gap-y-4 mt-4 sm:mt-0"
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
                          className="text-black px-5 py-3 w-full border-2 border-[#820001]/50 focus:border-[#820001] focus:ring-0 focus:outline-none transition-shadow rounded-md lg:rounded-l-lg lg:rounded-r-none"
                          placeholder="Enter your email address"
                        />
                      </FormControl>
                      <FormMessage className=" lg:absolute text-center" />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#820001] text-white px-10 py-3 text-sm rounded-md lg:rounded-r-lg lg:rounded-l-none hover:bg-red-800 transition-colors flex items-center justify-center"
                >
                  {isPending ? (
                    <span className="spinner-border animate-spin w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
              <div className="mt-2">
                {successMessage && <FormSuccess message={successMessage} />}
                {errorMessage && <FormError message={errorMessage} />}
              </div>
            </Form>
            {/* <p className="text-xs text-center mt-3 text-white">
              By subscribing, you agree to our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>
            </p> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
