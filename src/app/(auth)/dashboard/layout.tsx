import { ReactNode } from "react";
import Navbar from "@/components/dashboard/navbar/Navbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

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
