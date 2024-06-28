"use server";
import { z } from "zod";
import { signUpSchema } from "@/components/forms/sign-up-form";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { signInSchema } from "@/components/forms/sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/google-oauth";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) {
      return {
        error: "Invalid Credentials!",
        success: false,
      };
    }
    const hashedPassword = await new Argon2id().hash(values.password);
    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        name: values.name,
        hashedPassword,
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
      success: false,
    };
  }
};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    });
    if (!user || !user.hashedPassword) {
      return {
        success: false,
        error: "Invalid Credentials",
      };
    }
    const passwordMatch = await new Argon2id().verify(
      user.hashedPassword,
      values.password
    );
    if (!passwordMatch) {
      return {
        success: false,
        error: "Invalid Credentials",
      };
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
      success: false,
    };
  }
};

export const logout = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth");
};

export const getGoogleOAuthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    const url: URL = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    );

    return {
      success: true,
      url: url.toString(),
    };
  } catch (error) {
    console.log("Something went wrong", error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
