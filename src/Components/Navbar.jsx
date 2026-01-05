import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import {
  MdDashboard,
  MdInventory2,
  MdOutlineReport,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: MdInventory2,
  },
  {
    name: "Leads",
    path: "/leads",
    icon: HiUsers,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: MdOutlineReport,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: FaShoppingCart,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authUser");
    navigate("/login");
  }, [navigate]);

  return (
    <aside className="h-screen w-64 bg-[#1F1F1F] text-white flex flex-col">
      {/* ---------- Brand ---------- */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
        <img
          src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?w=200"
          alt="Company Logo"
          className="w-10 h-10 rounded-lg object-cover"
        />
        <h2 className="text-lg font-semibold truncate">
          Company Name
        </h2>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;

          return (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`
                group flex items-center gap-3 w-full px-4 py-3 rounded-lg
                text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <Icon
                size={20}
                className={`
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }
                `}
              />
              <span>{name}</span>
            </button>
          );
        })}
      </nav>

      {/* ---------- Footer / Logout ---------- */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 w-full px-4 py-3 rounded-lg
            text-sm font-medium text-red-400
            hover:bg-gray-800 hover:text-red-300
            transition
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
