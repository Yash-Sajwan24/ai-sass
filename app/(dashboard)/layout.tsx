import Navbar from "@/components/navbar";
import Sidebar  from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:w-72 md:flex md:flex-col md:inset-y-0 z-[80] md:fixed  bg-gray-900">
          <Sidebar />
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
