import { UserButton } from "@clerk/nextjs";

export default function DasboardPage() {
  return (
    <>
      <p>Dashboard Page (Protected)</p>
      <div className="h-screen">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
