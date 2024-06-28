"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

type Props = {
  SignUpTab: ReactNode;
  SignInTab: ReactNode;
};

function AuthForm({ SignInTab, SignUpTab }: Props) {
  return (
    <Tabs defaultValue="sign-in" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Login</TabsTrigger>
        <TabsTrigger value="sign-up">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">{SignInTab}</TabsContent>
      <TabsContent value="sign-up">{SignUpTab}</TabsContent>
    </Tabs>
  );
}

export default AuthForm;
