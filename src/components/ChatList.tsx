import { User } from "../types/user";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { ReactElement } from "react"; // 👈 add this

interface ChatListProps {
  users?: User[];
  onSelectUser?: (user: User) => void;
  selectedUser?: User | null;
}

export default function ChatList({
  users = [],
  onSelectUser,
  selectedUser,
}: ChatListProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-purple-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-red-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="w-full sm:w-72 bg-white flex flex-col h-full rounded-tr-xl rounded-bl-2xl">
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between mt-1">
          {/* 👇 Cast icons to ReactElement */}
          {BsLayoutSidebarReverse({ className: "text-xl" }) as ReactElement}
          <h2 className="font-semibold text-lg">Michael Johnson</h2>
          {TiEdit({ className: "text-xl" }) as ReactElement}
        </div>
      </div>

      <div className="p-2">
        <input
          type="text"
          placeholder="Search Chat"
          className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser?.(user)}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
                selectedUser?.id === user.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`${getAvatarColor(
                    user.id
                  )} text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate line-clamp-2">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-sm">No users found</div>
        )}
      </div>
    </div>
  );
}