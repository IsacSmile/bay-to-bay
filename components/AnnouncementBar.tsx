import React from "react";

interface AnnouncementBarProps {
  items?: string[];
}

const renderFormattedItem = (item: string) => {
  if (item.includes("→")) {
    const parts = item.split("→");
    return (
      <>
        <span>{parts[0].trim()}</span>
        <span className="text-[#25A8E8] font-black mx-1.5">→</span>
        <span>{parts[1].trim()}</span>
      </>
    );
  }
  if (item.includes(" TO ")) {
    const parts = item.split(" TO ");
    return (
      <>
        <span>{parts[0].trim()}</span>
        <span className="text-[#25A8E8] font-black mx-1.5">→</span>
        <span>{parts[1].trim()}</span>
      </>
    );
  }
  return <span>{item}</span>;
};

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  items = [
    "NORTHERN ONTARIO ROUTES",
    "NORTH BAY TO HEARST",
    "TWICE-WEEKLY SERVICE OPTIONS",
  ],
}) => {
  const displayItems =
    items && items.length > 0
      ? items
      : [
          "NORTHERN ONTARIO ROUTES",
          "NORTH BAY TO HEARST",
          "TWICE-WEEKLY SERVICE OPTIONS",
        ];

  return (
    <div className="relative bg-[#07203b] py-2 sm:py-2.5 px-3 sm:px-4 select-none overflow-hidden z-40 text-white border-b border-[#0D2942]">
      {/* Desktop Centered Single Line */}
      <div className="hidden sm:flex max-w-[1350px] mx-auto items-center justify-center gap-3 whitespace-nowrap text-xs font-semibold">
        {displayItems.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#25A8E8]/70 mx-2.5 select-none shrink-0"
                aria-hidden="true"
              />
            )}
            <span
              className={
                idx === 0
                  ? "font-bold text-[#25A8E8]"
                  : idx === 1
                  ? "font-extrabold text-white"
                  : "text-slate-300 font-normal"
              }
            >
              {renderFormattedItem(item)}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Streamlined Infinite Marquee with Edge Fade Masks (Left-aligned container start) */}
      <div className="sm:hidden relative w-full overflow-hidden whitespace-nowrap py-0.5 text-left">
        {/* Left & Right subtle edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#07203b] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#07203b] to-transparent z-10" />

        <div className="inline-flex w-max shrink-0 animate-marquee items-center text-xs font-semibold text-slate-200">
          {[...displayItems, ...displayItems, ...displayItems, ...displayItems].map(
            (item, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-flex items-center px-1">
                  {renderFormattedItem(item)}
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#25A8E8]/70 mx-3 select-none shrink-0"
                  aria-hidden="true"
                />
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
};
