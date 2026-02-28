import { User } from "../types/user";
import { useState, ReactElement } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaUser, FaRegCircleUser, FaCircleUser, FaInstagram, FaAngleDown } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { BiLogoWhatsapp } from "react-icons/bi";

interface SidebarProps {
  users?: User[];
  onSelectUser?: (user: User) => void;
}

export default function Sidebar({ users = [], onSelectUser }: SidebarProps) {
  const [expandedInbox, setExpandedInbox] = useState(true);
  const [expandedTeams, setExpandedTeams] = useState(true);
  const [expandedUsers, setExpandedUsers] = useState(true);

  const getInitials = (name: string) => name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const getAvatarColor = (id: number) => {
    const colors = ["bg-purple-500","bg-yellow-500","bg-blue-500","bg-red-500","bg-green-500","bg-pink-500","bg-indigo-500","bg-orange-500"];
    return colors[id % colors.length];
  };

  const teams = [
    { id: 1, name: "Sales", count: 7, userIds: [1, 2, 3, 4] },
    { id: 2, name: "Customer Support", count: 16, userIds: [5, 6, 7, 8] },
  ];

  const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);

  const getTeamUsers = (userIds: number[]) => users.filter((user) => userIds.includes(user.id));

  return (
    <div className="flex bg-white flex-col overflow-y-auto scrollbar-hide rounded-tl-xl rounded-bl-xl h-full">
      <div className="p-2">
        <div
          className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => setExpandedInbox(!expandedInbox)}
        >
          <h2 className="font-semibold text-xl">Inbox</h2>
          <span className={`text-gray-600 transition ${expandedInbox ? "rotate-180" : ""}`}>
            {IoChevronDown({} as any) as ReactElement}
          </span>
        </div>

        {expandedInbox && (
          <ul className="space-y-2 text-xs text-gray-600 pl-4">
            <li className="font-medium text-black cursor-pointer hover:text-blue-600 py-1 flex items-center space-x-2">
              {FaUser({} as any) as ReactElement}
              <p className="text-[14px]">My Inbox</p>
            </li>
            <li className="cursor-pointer hover:text-blue-600 py-1 flex items-center space-x-2">
              {HiUsers({} as any) as ReactElement}
              <span className="flex justify-between w-full">
                <p className=" text-[14px]">All</p>
                <span className="text-gray-400 ml-1">28</span>
              </span>
            </li>
            <li className="cursor-pointer hover:text-blue-600 py-1 flex items-center space-x-2">
              {FaRegCircleUser({} as any) as ReactElement}
              <div className="flex justify-between w-full">
                <p>Unassigned</p>
                <span className="text-gray-400 ml-1">5</span>
              </div>
            </li>
          </ul>
        )}
      </div>

      {/* Teams Section */}
      <div className="p-2">
        <div
          className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => setExpandedTeams(!expandedTeams)}
        >
          <h5 className="font-semibold text-sm">Teams</h5>
          <span className={`text-gray-600 transition ${expandedTeams ? "rotate-180" : ""}`}>
            {IoChevronDown({} as any) as ReactElement}
          </span>
        </div>

        {expandedTeams && (
          <div className="space-y-2">
            {teams.map((team) => (
              <div key={team.id}>
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded ml-2"
                  onClick={() => setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                >
                  <span className="text-xs font-medium text-gray-700 flex items-center space-x-1">
                    {FaCircleUser({} as any) as ReactElement}
                    <span>{team.name} <span className="text-gray-400">({team.count})</span></span>
                  </span>
                  <span className={`text-gray-600 text-xs transition ${expandedTeamId === team.id ? "rotate-180" : ""}`}>
                    {IoChevronDown({} as any) as ReactElement}
                  </span>
                </div>

                {expandedTeamId === team.id && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-gray-300 pl-3">
                    {getTeamUsers(team.userIds).map((user) => (
                      <div
                        key={user.id}
                        onClick={() => onSelectUser?.(user)}
                        className="cursor-pointer hover:bg-blue-50 p-2 rounded flex items-center gap-2 text-xs group"
                      >
                        <div
                          className={`${getAvatarColor(user.id)} text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0`}
                        >
                          {getInitials(user.name)}
                        </div>
                        <span className="text-gray-700 truncate group-hover:text-blue-600">{user.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Users Section */}
      <div className="p-4 flex-1">
        <div
          className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => setExpandedUsers(!expandedUsers)}
        >
          <h2 className="font-semibold text-sm">All Users</h2>
          <span className={`text-gray-600 transition ${expandedUsers ? "rotate-180" : ""}`}>
            {IoChevronDown({} as any) as ReactElement}
          </span>
        </div>

        {expandedUsers && (
          <div className="mt-3 space-y-1 max-h-72 overflow-y-auto scrollbar-hide">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => onSelectUser?.(user)}
                className="cursor-pointer hover:bg-blue-50 p-2 hover:shadow-lg rounded-lg flex items-center gap-2 text-xs group"
              >
                <div
                  className={`${getAvatarColor(user.id)} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 truncate group-hover:text-blue-600">{user.name}</p>
                  <p className="text-gray-400 truncate text-xs">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Channels Section */}
      <div className="p-2">
        <div className="flex items-center gap-[50px] mb-5">
          <h3 className="font-semibold text-sm">Channels</h3>
          <button className="text-black">{FaAngleDown({} as any) as ReactElement}</button>
        </div>
        <ul className="space-y-4 text-xs text-gray-600">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:border-gray-300 hover:shadow-lg py-1 px-2 rounded-lg border border-gray-300">
            <span className="flex items-center justify-center h-8 w-8 bg-green-500 text-white mr-2 rounded-full">
              {BiLogoWhatsapp({ className: "text-xl" } as any) as ReactElement}
            </span>
            <span className="text-[16px]">Fit4Life</span>
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xl font-semibold bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              {FaInstagram({ className: "text-xl" } as any) as ReactElement}
            </div>
            <span className="text-[16px]">Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}