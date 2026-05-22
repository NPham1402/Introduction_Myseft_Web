"use client";
import { useState } from "react";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";

export default function CopyText({ text, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  return (
    <span
      onClick={handleCopy}
      title="Click to copy"
      className={`cursor-pointer inline-flex items-center gap-[4px] group ${className}`}
    >
      {text}
      <span className="opacity-0 group-hover:opacity-60 transition-opacity">
        {copied
          ? <IoCheckmarkOutline size={13} className="text-[#04b4e0]" />
          : <IoCopyOutline size={13} />}
      </span>
    </span>
  );
}
