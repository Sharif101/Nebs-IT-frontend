import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo/Logo.png";
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  UserCheck,
  MessageSquare,
  FileText,
  Clipboard,
  List,
  FileEdit,
  User,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const DashLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState(["Employee"]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((i) => i !== menuName)
        : [...prev, menuName]
    );
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "#" },
    {
      name: "Employee",
      icon: Users,
      hasSubmenu: true,
      submenu: [
        { name: "Employee Database", path: "/employee/database" },
        { name: "Add New Employee", path: "#" },
        { name: "Performance Report", path: "#" },
        { name: "Performance History", path: "#" },
      ],
    },
    { name: "Payroll", icon: Package, path: "#" },
    { name: "Pay Slip", icon: CreditCard, path: "#" },
    { name: "Attendance", icon: UserCheck, path: "#" },
    { name: "Request Center", icon: MessageSquare, path: "#" },
    { name: "Career Database", icon: Users, path: "#" },
    { name: "Document manager", icon: FileText, path: "#" },
    { name: "Notice Board", icon: Clipboard, path: "/notice/create" },
    { name: "Activity Log", icon: List, path: "#" },
    { name: "Exit Interview", icon: FileEdit, path: "#" },
    { name: "Profile", icon: User, path: "#" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r transition-all duration-300 z-30 ${
          isSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="h-16 flex items-center px-6 font-semibold text-gray-800 border-b">
          <img src={logo} alt="" className="h-6 w-15" />
        </div>

        <nav className="px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus.includes(item.name);

            const isActive =
              item.path === pathname ||
              (item.hasSubmenu &&
                item.submenu?.some((sub) => pathname === sub.path));

            return (
              <div key={item.name}>
                <button
                  onClick={() =>
                    item.hasSubmenu
                      ? toggleMenu(item.name)
                      : item.path && navigate(item.path)
                  }
                  className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition
                    ${
                      isActive
                        ? "bg-gray-50 font-medium text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {isActive && (
                    <span className="absolute right-0 top-1 bottom-1 w-[2px] rounded bg-orange-500" />
                  )}

                  <Icon size={18} className="text-gray-400" />
                  <span className="flex-1 text-left">{item.name}</span>

                  {item.hasSubmenu &&
                    (isExpanded ? (
                      <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    ))}
                </button>

                {item.hasSubmenu && isExpanded && (
                  <div className="ml-8 mt-1 rounded-md bg-gray-50 p-2 space-y-1">
                    {item.submenu.map((sub) => {
                      const isSubActive = pathname === sub.path;

                      return (
                        <button
                          key={sub.name}
                          onClick={() => navigate(sub.path)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition
                            ${
                              isSubActive
                                ? "text-orange-500 font-medium"
                                : "text-gray-600 hover:bg-white"
                            }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header className="h-16 bg-white border-b flex items-center px-4 fixed w-full z-20">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 mr-4"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            Good Afternoon
          </h1>
        </header>

        <div className="pt-16 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashLayout;
