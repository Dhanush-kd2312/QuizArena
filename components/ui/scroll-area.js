import React from "react";

export function ScrollArea({ children, className }) {
  return (
    <div className={`overflow-y-auto max-h-[400px] ${className || ""}`}>
      {children}
    </div>
  );
}
