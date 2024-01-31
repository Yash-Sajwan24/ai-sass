"use client";

import Heading from "@/components/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Empty from "@/components/empty";
import Loader from "@/components/loader";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

import ReactMarkdown from "react-markdown";

import { useProModal } from "@/hooks/use-pro-modal";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response: string = await axios.post("/api/code", {
        message: values.prompt,
      });

      const res: any = {
        prompt: values.prompt,
        result: response,
      };
      const resArray: any = [res, ...messages];

      setMessages(resArray);
      form.reset();
    } catch (err: any) {
      if (err?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Simple toggle button using React hooks."
                      disabled={isLoading}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              type="submit"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}

        {messages.length === 0 && !isLoading && (
          <div>
            <Empty label="No Conversation started." />
          </div>
        )}

        <div className="flex flex-col gap-y-4">
          {messages.map((message: any, id) => (
            <div
              key={id}
              className={
                " text-sm p-8 w-full flex-col items-start gap-x-8 rounded-lg"
              }
            >
              <div className="bg-[#313641] text-white flex border border-black/10">
                <BotAvatar />
                <p className="p-4">{message.prompt}</p>
              </div>
              <div className="flex bg-muted">
                <UserAvatar />
                <p className="p-4">
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message.result.data}
                  </ReactMarkdown>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CodePage;
