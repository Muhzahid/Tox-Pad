import { User } from "../types/user";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { FaRegCircleUser, FaInstagram } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi2";
import { getUserContactData } from "../utils/userHelpers";
import {
  Section,
  Row,
  GridRow,
  Label,
} from "../utils/details-panel.helpers";
import { ReactElement } from "react"; // 👈 important

interface DetailsPanelProps {
  selectedUser?: User | null;
}

export default function DetailsPanel({ selectedUser }: DetailsPanelProps) {
  if (!selectedUser) {
    return (
      <div className="hidden xl:flex w-80 bg-white items-center justify-center rounded-2xl">
        <p className="text-gray-400 text-sm">Select a user to view details</p>
      </div>
    );
  }

  const { firstName, lastName, email, phone } =
    getUserContactData(selectedUser);

  return (
    <div className="hidden xl:flex w-80 flex-col bg-white rounded-xl overflow-hidden ">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-300 sticky top-0 z-10 bg-white flex items-center justify-between">
        <h1 className="font-semibold text-lg">Details</h1>
        <button className="text-2xl">
          {BsLayoutSidebarReverse({} as any) as ReactElement}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="p-2 flex-1 overflow-y-auto scrollbar-hide">
        {/* Chat Data */}
        <Section title="Chat Data">
          <Row
            label="Assignee"
            value={
              <div className="flex items-center gap-2">
                {FaRegCircleUser({} as any) as ReactElement}
                <span>James West</span>
              </div>
            }
          />
          <Row
            label="Team"
            value={
              <div className="flex items-center gap-2">
                {FaRegCircleUser({} as any) as ReactElement}
                <span>Sales Team</span>
              </div>
            }
          />
        </Section>

        {/* Contact Data */}
        <Section title="Contact Data">
          <GridRow label="First Name" value={firstName} />
          <GridRow label="Last Name" value={lastName} />
          <GridRow label="Phone number" value={phone} />
          <GridRow label="Email" value={email} />
        </Section>

        {/* Contact Labels */}
        <Section title="Contact Labels">
          <div className="flex flex-wrap gap-2">
            <Label text="Closed Won" />
            <Label text="Clentech" />
            <button className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600">
              {HiPlus({} as any) as ReactElement}
            </button>
          </div>
        </Section>

        {/* Notes */}
        <Section title="Notes" className="flex flex-col">
          <div className="bg-yellow-200 p-2 rounded-xl text-sm text-yellow-900">
            Add a note
          </div>
          <div className="bg-yellow-200 p-2 rounded-xl text-sm font-medium text-black mt-2">
            Strong potential for future upgrades
          </div>
        </Section>

        {/* Other Chats */}
        <Section title="Other Chats">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              {FaInstagram({} as any) as ReactElement}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Fit4Life</p>
              <p className="text-sm text-gray-500">On my way!</p>
            </div>
            <p className="text-sm text-gray-500">08/08/25</p>
          </div>
        </Section>
      </div>
    </div>
  );
}