"use client";

import React, { useState } from "react";
import { AccordionItem } from "@/components/faq/AccordionItem";
import { FaqItemData } from "@/lib/prisma";

export interface FaqAccordionProps {
  items: FaqItemData[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  // First item open by default
  const [openId, setOpenId] = useState<string | null>(
    items.length > 0 ? items[0].id : null
  );

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full border-t border-slate-200/80">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};
