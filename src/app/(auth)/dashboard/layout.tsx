import { ReactNode } from "react";
import Navbar from "@/components/dashboardNavigation/Nav";
import Sidebar from "@/components/dashboardSidebar/Sidebar";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div
        className="w-full flex items-stretch overflow-hidden"
        style={{ height: "calc(100vh - 66px)" }}
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
