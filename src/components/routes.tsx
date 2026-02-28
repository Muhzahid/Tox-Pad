import React, { ReactElement } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { SlTag } from "react-icons/sl";

/* ───────── Section ───────── */
export const Section = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={"border-b border-gray-300 px-2 py-3 space-y-1 " + (className || "")}>
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      {/* Cast as ReactElement */}
      <span className="text-sm">{FaAngleDown as unknown as ReactElement}</span>
    </div>
    {children}
  </div>
);

/* ───────── Row ───────── */
export const Row = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between text-sm">
    <p className="text-gray-600 font-medium">{label}</p>
    <div className="text-black">{value}</div>
  </div>
);

/* ───────── GridRow ───────── */
export const GridRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[120px_1fr] text-sm gap-2">
    <p className="text-gray-600 font-medium">{label}</p>
    <p className="text-black break-all">{value}</p>
  </div>
);

/* ───────── Label ───────── */
export const Label = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1 px-1 py-1 rounded-full text-sm border-2 border-blue-600 bg-blue-100 text-blue-700">
    {SlTag as unknown as ReactElement}
    {text}
  </span>
);