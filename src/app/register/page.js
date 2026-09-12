import { AuthModal } from "@/components/ui/AuthModals/AuthModals";

export const metadata = {
  title: "Register — Swarn Bharat",
  description: "Create your Swarn Bharat member profile to access portals and programmes.",
};

export default function RegisterPage() {
  return <AuthModal isPage={true} initialView="reg_identifier" />;
}

