import Navbar from "@/components/navbar";
import Sidebar  from "@/components/sidebar";

import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  const isPro = await checkSubscription();

  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:w-72 md:flex md:flex-col md:inset-y-0 z-[80] md:fixed  bg-gray-900">
          <Sidebar isPro={isPro} apiLimitCount= {apiLimitCount}/>
        </div>
        <main className="md:pl-72">
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
