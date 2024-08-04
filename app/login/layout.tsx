import Login from "./page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginLayout() {
  return <Login />;
}
