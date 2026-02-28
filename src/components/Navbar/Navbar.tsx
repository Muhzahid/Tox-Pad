import { useState } from "react";
import { User } from "../../types/user";
import { FiUsers, FiCpu, FiTarget, FiMenu, FiX } from "react-icons/fi";
import { RiInboxLine } from "react-icons/ri";
import { PiNetworkFill } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { ReactElement } from "react"; // 👈 import ReactElement

interface NavbarProps {
  user?: User;
  onMenuClick?: () => void;
}

export default function Navbar({ user, onMenuClick }: NavbarProps) {
  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { label: string; icon: ReactElement }[] = [
    { label: "Inbox", icon: RiInboxLine({} as any) as ReactElement },
    { label: "Contacts", icon: FiUsers({} as any) as ReactElement },
    { label: "AI Employees", icon: FiCpu({} as any) as ReactElement },
    { label: "Workflows", icon: PiNetworkFill({} as any) as ReactElement },
    { label: "Campaigns", icon: FiTarget({} as any) as ReactElement },
  ];

  return (
    <div className="h-14 bg-white flex items-center justify-between px-4 sm:px-6 rounded-2xl shadow-sm relative">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-4 lg:gap-8">
        <h1 className="text-blue-600 font-bold text-lg">BOXpad</h1>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-4 xl:gap-8 text-sm items-center">
          {menuItems.map((item) => {
            const isInbox = item.label === "Inbox";
            return (
              <span
                key={item.label}
                className={`flex items-center gap-2 font-medium cursor-pointer transition-colors ${
                  isInbox
                    ? "bg-gray-100 px-3 py-2 rounded-lg"
                    : "hover:text-blue-600 px-2"
                }`}
              >
                <span className={isInbox ? "text-black" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span
                  className={`font-[600] ${
                    isInbox ? "text-black" : "text-gray-800"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700 text-2xl"
          onClick={() => {
            if (typeof onMenuClick === "function") {
              onMenuClick();
              return;
            }
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {FiMenu({} as any) as ReactElement}
        </button>
      </div>

      {/* Right: User info */}
      <div className="flex items-center gap-2 sm:gap-3">
        {IoSettingsOutline({} as any) as ReactElement}
        <div className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <span className="hidden sm:inline text-sm font-medium">
          {displayName}
        </span>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
  <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg p-6 flex flex-col gap-6 lg:hidden transition-transform duration-300">
    {menuItems.map((item) => {
      const isInbox = item.label === "Inbox";
      return (
        <span 
          key={item.label} 
          className={`flex items-center gap-3 font-medium cursor-pointer ${
            isInbox 
              ? "bg-gray-100 px-4 py-3 rounded-xl text-black" 
              : "text-gray-800 hover:text-blue-600 px-2"
          }`}
        >
          <span className={isInbox ? "text-black" : "text-gray-500"}>{item.icon}</span>
          <span>{item.label}</span>
        </span>
      );
    })}
  </div>
)}
    </div>
  );
}
