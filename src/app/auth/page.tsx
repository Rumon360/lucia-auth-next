import AuthForm from "@/components/auth-form";
import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

async function AuthPage() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return (
    <div className="relative flex w-full bg-background min-h-[calc(100vh-4rem)] justify-center items-center">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <AuthForm SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
}

export default AuthPage;
