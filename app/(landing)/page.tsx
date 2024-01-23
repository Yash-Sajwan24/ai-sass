import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
    <p>This is the Landing page  </p>
     
        <Link href="/sign-in">
            <Button> Login</Button>
         </Link>
        <Link href="/sign-up">
            <Button> Register</Button>
         </Link>

    </>
  );
}
