import { AuthModal } from "@/components/ui/AuthModals/AuthModals";

export const metadata = {
  title: "Sign In — Swarn Bharat",
  description: "Sign in to your Swarn Bharat member or administrative portal.",
};

export default function LoginPage() {
  return <AuthModal isPage={true} initialView="login" />;
}
