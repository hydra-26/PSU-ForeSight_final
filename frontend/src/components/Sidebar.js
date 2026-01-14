import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  MapPin,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Logo from "../assets/logo-white.svg";
import Icon from "../assets/Icon-white.svg";

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed
}) => {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard Overview" },
    { id: "enrollment", icon: Users, label: "Enrollment Data" },
    { id: "graduation", icon: GraduationCap, label: "Graduation Data" },
    { id: "faculty", icon: Users, label: "Faculty Data" },
    { id: "demographics", icon: MapPin, label: "Demographics" },
    { id: "forecasting", icon: TrendingUp, label: "Forecasting" }
  ];

  return (
    <aside
      className={`bg-[#003366] transition-all duration-300 ${
        sidebarCollapsed ? "w-20" : "w-64"
      } flex flex-col relative h-screen`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-blue-900 flex items-center justify-center">
        {sidebarCollapsed ? (
          <img
            src={Icon}
            alt="PSU Icon"
            className="w-12 h-12 transition-all duration-300"
          />
        ) : (
          <img
            src={Logo}
            alt="PSU Logo"
            className="w-30 h-30 transition-all duration-300"
          />
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border-2 border-[#003366] rounded-full p-1 hover:bg-gray-100 transition z-10"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4 text-[#003366]" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#003366]" />
        )}
      </button>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${
                activeTab === item.id
                  ? "bg-yellow-400 text-gray-900"
                  : "text-white hover:bg-blue-900"
              }`}
            >
              <IconComponent className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
