import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Menu, X } from "lucide-react";

const DashLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [{ name: "Notice Board", path: "/", icon: LayoutDashboard }];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
        </div>

        <div className="p-4 space-y-2 mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between fixed top-0 w-full z-20 px-4">
          <div className="flex items-center gap-4">
            <button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <h1 className="text-xl font-bold text-gray-900">Good Afternoon</h1>
          </div>
        </div>

        <div className="pt-16 flex-1 overflow-y-auto p-6 from-blue-50 to-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
