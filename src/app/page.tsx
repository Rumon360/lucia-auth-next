import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-screen-xl px-2 w-full mx-auto pt-10">
      <h1 className="scroll-m-20 max-w-xl text-4xl font-extrabold tracking-tight lg:text-5xl">
        Trying out Lucia Auth with Next JS 14
      </h1>
      <h2 className="scroll-m-20 border-b border-t my-6 pt-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Lucia is an auth library for your server that abstracts away the
        complexity of handling sessions. It works alongside your database to
        provide an API that&apos;s easy to use, understand, and extend.
      </h2>
      <div className="flex gap-2 items-center">
        <Link
          href={"https://lucia-auth.com/"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Checkout Lucia
        </Link>
        <Link
          href={"https://hmk360.vercel.app/"}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Developer
        </Link>
      </div>
    </main>
  );
}
