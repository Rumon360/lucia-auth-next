import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { getUser } from "@/lib/lucia";
import SignOutButton from "./sign-out-button";

async function Nav() {
  const user = await getUser();

  return (
    <header className="w-full h-16 border-b relative">
      <div className="max-w-screen-xl px-2 mx-auto  w-full h-full flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <span className="cursor-pointer text-xl font-semibold tracking-tight">
              Lucia <span className="text-primary">Auth</span>
            </span>
          </Link>
        </div>
        <nav className="flex gap-1 text-sm items-center">
          {user && (
            <Link
              href={"/protected"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <SignOutButton />
          ) : (
            <Link
              href={"/auth"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Auth
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
