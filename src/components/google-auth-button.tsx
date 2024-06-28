"use client";
import { getGoogleOAuthConsentUrl } from "@/app/actions/auth.actions";
import GoogleIcon from "./icons/google.icon";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {};

function GoogleAuthButton({}: Props) {
  return (
    <Button
      onClick={async () => {
        const response = await getGoogleOAuthConsentUrl();
        if (response.success) {
          if (response.url) {
            window.location.href = response.url;
          }
        } else {
          toast.error(response.error);
        }
      }}
      type="button"
      variant="outline"
      className="w-full"
    >
      <GoogleIcon /> Continue with Google
    </Button>
  );
}

export default GoogleAuthButton;
