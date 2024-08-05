import Signup from "./page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
  description: "Create an account",
};

export default function LoginLayout() {
  return <Signup />;
}
