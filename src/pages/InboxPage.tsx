
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Loader from "../components/ui/Loader";
import DetailsPanel from "../components/DetailsPannel";

export default function InboxPage() {
  const { users, loading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <LoaderScreen />;
  if (error) return <ErrorScreen />;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative p-2">
        {/* Overlay (Mobile only) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:relative inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-300 transition-transform duration-300
    rounded-tl-2xl rounded-bl-2xl
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <Sidebar
            users={users}
            onSelectUser={(user: User) => {
              setSelectedUser(user);
              setSidebarOpen(false);
            }}
          />
        </div>

        {/* Chat Section Wrapper */}
        <div className="flex flex-1 min-w-0 gap-2">
          {/* Chat List */}
          <div
            className={`
    ${selectedUser ? "hidden sm:flex" : "flex"}
    w-full sm:w-72 bg-white flex-col
    rounded-tr-2xl rounded-br-2xl
  `}
          >
            <ChatList
              users={users}
              selectedUser={selectedUser}
              onSelectUser={(user: User) => setSelectedUser(user)}
            />
          </div>

          {/* Chat Window */}
          <div
            className={`
            ${selectedUser ? "flex" : "hidden sm:flex"}
            flex-1 min-w-0 flex-col
          `}
          >
            <ChatWindow
              selectedUser={selectedUser}
              onBack={() => setSelectedUser(null)} // for mobile back button
            />
          </div>

          {/* Details Panel (Large Screens Only) */}
          <div className="hidden xl:flex w-80 ">
            <DetailsPanel selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

const LoaderScreen = () => (
  <div className="h-screen flex items-center justify-center">
    <Loader />
  </div>
);

const ErrorScreen = () => (
  <div className="h-screen flex items-center justify-center text-red-500">
    Failed to load users
  </div>
);
