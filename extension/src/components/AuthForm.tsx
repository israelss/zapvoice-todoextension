"use client";

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
import { ExtensionMessage } from "@/interfaces";
import { authSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const AuthForm = ({ formType }: { formType: "login" | "register" }) => {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      type: formType,
    },
  });

  function onSubmit(values: z.infer<typeof authSchema>) {
    const payload: ExtensionMessage = {
      type: values.type === "login" ? "LOGIN_REQUEST" : "REGISTER_REQUEST",
      payload: {
        email: values.email,
        password: values.password,
      },
    };
    chrome.runtime.sendMessage<ExtensionMessage>(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="senha"
                  type="password"
                  autoComplete={
                    formType === "login" ? "current-password" : "new-password"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {formType === "login" ? "Entrar" : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};
