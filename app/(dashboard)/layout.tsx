import Navbar from "@/components/navbar";
import Sidebar  from "@/components/sidebar";

import { getApiLimitCount } from "@/lib/api-limit";
import { ModalProvider } from "@/components/modal-provider";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:w-72 md:flex md:flex-col md:inset-y-0 z-[80] md:fixed  bg-gray-900">
          <Sidebar apiLimitCount= {apiLimitCount}/>
        </div>
        <main className="md:pl-72">
        <ModalProvider />
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
