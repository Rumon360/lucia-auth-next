"use client";

import { logout } from "@/app/actions/auth.actions";
import { Button } from "./ui/button";

function SignOutButton() {
  return (
    <Button
      onClick={() => {
        logout();
      }}
      variant={"outline"}
    >
      Logout
    </Button>
  );
}

export default SignOutButton;
