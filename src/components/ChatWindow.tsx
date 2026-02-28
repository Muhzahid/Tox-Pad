import { User } from "../types/user";
import { GrGallery } from "react-icons/gr";
import { GoVideo } from "react-icons/go";
import { RiFileList3Line } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { BiSolidShare } from "react-icons/bi";
import { BsLightningCharge, BsFillMoonStarsFill } from "react-icons/bs";
import { MdKeyboardVoice } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { LuSquareArrowDown } from "react-icons/lu";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { ReactElement } from "react"; // 👈 important

interface ChatWindowProps {
  selectedUser?: User | null;
  onBack?: () => void;
}

export default function ChatWindow({ selectedUser, onBack }: ChatWindowProps) {
  if (!selectedUser) {
    return (
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-center">
          Select a user to view messages
        </p>
      </div>
    );
  }

  const initials = selectedUser.name
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

  const messages = [
    {
      id: 1,
      author: selectedUser.name,
      text: `Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?`,
      timestamp: "23:23",
      isUser: true,
    },
    {
      id: 2,
      author: "Support",
      text: `Hello ${selectedUser.name}! 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?`,
      timestamp: "23:08",
      isUser: false,
    },
    {
      id: 3,
      author: selectedUser.name,
      text: `Yes, it's ${selectedUser.email}`,
      timestamp: "23:16",
      isUser: true,
    },
    {
      id: 4,
      author: "Support",
      text: `Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.`,
      timestamp: "23:20",
      isUser: false,
    },
    {
      id: 5,
      author: selectedUser.name,
      text: `I see it, resetting now...`,
      timestamp: "23:23",
      isUser: true,
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 flex flex-col rounded-xl sm:rounded-2xl overflow-hidden w-full h-full">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-300 flex items-center px-4 sm:px-6 justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="sm:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {/* Back icon if needed */}
            </button>
          )}
          <div>
            <p className="font-bold text-base sm:text-lg">
              {selectedUser.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center bg-gray-100">
            {HiDotsVertical({} as any) as ReactElement}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg h-10 w-10 flex items-center justify-center bg-gray-100">
            {BsFillMoonStarsFill({} as any) as ReactElement}
          </button>
          <button className="p-2 rounded-lg h-10 w-10 flex items-center justify-center text-xl bg-black text-white">
            {LuSquareArrowDown({} as any) as ReactElement}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 bg-white scrollbar-hide">
        {/* Date Separator */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#f0f0f0] text-black font-semibold text-xs px-4 py-2 rounded-xl">
            28 August 2025
          </div>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full mb-6 ${
              msg.isUser ? "justify-start" : "justify-end"
            }`}
          >
            {/* Timestamp & Checkmark for Support (Right aligned bubble, side info on left) */}
            {!msg.isUser && (
              <div className="flex flex-col items-center mr-3 mt-1">
                <span className="text-xs text-black font-medium">{msg.timestamp}</span>
                <span className="text-[#3b82f6] text-lg mt-0.5">
                  {IoCheckmarkDoneOutline({} as any) as ReactElement}
                </span>
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[70%] px-5 py-4 rounded-3xl text-[15px] leading-relaxed ${
                msg.isUser
                  ? "bg-[#f2f2f2] text-black"
                  : "bg-[#ebdfff] text-black"
              }`}
            >
              {msg.text}
            </div>

            {/* Timestamp for Contact (Left aligned bubble, side info on right) */}
            {msg.isUser && (
              <div className="flex flex-col items-center ml-3 mt-1">
                <span className="text-xs text-black font-medium">{msg.timestamp}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-300">
        <div className="bg-white rounded-2xl px-4 py-4 border border-gray-200">
          <textarea
            placeholder="Type something...."
            rows={2}
            className="w-full bg-transparent text-sm resize-none outline-none placeholder-gray-400"
          />

          <div className="flex items-center justify-between mt-4 text-gray-600">
            <div className="flex items-center gap-4 text-2xl">
              {GrGallery({} as any) as ReactElement}
              {GoVideo({} as any) as ReactElement}
              {RiFileList3Line({} as any) as ReactElement}
              {GrEmoji({} as any) as ReactElement}
              {BiSolidShare({} as any) as ReactElement}
            </div>

            <div className="flex items-center gap-4 text-2xl">
              {BsLightningCharge({} as any) as ReactElement}
              {MdKeyboardVoice({} as any) as ReactElement}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
