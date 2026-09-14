import React from "react";

interface AnnouncementBarProps {
  items?: string[];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  items = [
    "Northern Ontario routes",
    "North Bay → Hearst",
    "Twice-weekly scheduled service",
  ],
}) => {
  const displayItems =
    items && items.length > 0
      ? items
      : [
          "Northern Ontario routes",
          "North Bay → Hearst",
          "Twice-weekly scheduled service",
        ];

  return (
    <div className="relative bg-[#07203b] py-2 sm:py-2.5 px-3 sm:px-4 text-center select-none overflow-hidden z-40 text-white">
      {/* Desktop Centered Single Line (Dynamically rendered with unified separators) */}
      <div className="hidden sm:flex max-w-[1350px] mx-auto items-center justify-center gap-3 whitespace-nowrap text-xs">
        {displayItems.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span className="inline-block w-1 h-1 rounded-full bg-[#25A8E8]/60 mx-2 select-none shrink-0" aria-hidden="true" />
            )}
            <span className={idx === 0 ? "font-bold text-[#25A8E8]" : idx === 1 ? "font-extrabold text-white" : "text-slate-300 font-normal"}>
              {item.includes("→") ? (
                <>
                  {item.split("→")[0]}
                  <span className="text-[#25A8E8] font-black mx-1">→</span>
                  {item.split("→")[1]}
                </>
              ) : (
                item
              )}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Streamlined Single-Line Marquee with Edge Fade Masks & Unified Separators */}
      <div className="sm:hidden relative w-full overflow-hidden whitespace-nowrap py-0.5">
        {/* Left & Right subtle edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#07203b] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#07203b] to-transparent z-10" />

        <div className="inline-flex w-max shrink-0 animate-marquee items-center gap-3 text-xs font-semibold text-slate-200">
          {[...displayItems, ...displayItems, ...displayItems, ...displayItems].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="inline-flex items-center">
                {item.includes("→") ? (
                  <span>
                    {item.split("→")[0]}
                    <span className="text-[#25A8E8] font-bold mx-1">→</span>
                    {item.split("→")[1]}
                  </span>
                ) : (
                  <span>{item}</span>
                )}
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#25A8E8]/60 mx-2 select-none shrink-0" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};









