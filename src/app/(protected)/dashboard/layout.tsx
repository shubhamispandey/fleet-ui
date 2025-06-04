// DashboardLayout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/dashboard/navbar/Navbar";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default DashboardLayout;
