import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();
  signOut();
  router.push("/");
  return;
}
