/* eslint-disable @next/next/no-img-element */
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

async function ProtectedPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <div className="max-w-screen-xl px-2 w-full mx-auto pt-20">
      <div className="flex flex-col md:flex-row gap-3 items-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <h1>Welcome,</h1>
        <div className="flex items-center gap-2">
          {user.picture && (
            <img
              className="rounded-full size-20"
              src={user.picture}
              alt="user-img"
            />
          )}
          <div className="flex flex-col">
            <h1 className="scroll-m-20 text-primary text-3xl font-semibold tracking-tight first:mt-0">
              {user.name}
            </h1>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {user.email}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedPage;
