import React from "react";

interface HighlightItem {
  title: string;
  subtitle: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    title: "Small goods",
    subtitle: "Specialist delivery",
  },
  {
    title: "Twice weekly",
    subtitle: "Scheduled runs",
  },
  {
    title: "12-hour delivery",
    subtitle: "On eligible routes*",
  },
  {
    title: "Proof of delivery",
    subtitle: "Confidence on arrival",
  },
];

export const ServiceHighlights: React.FC = () => {
  return (
    <section className="w-full bg-[#EAF5FC] border-b border-[#D7E7F1] py-4.5 sm:py-5">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-y-5 sm:gap-y-6 lg:gap-y-0">
          {HIGHLIGHTS.map((item, index) => {
            const hasMobileDivider = index % 2 === 1;
            const hasDesktopDivider = index > 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col justify-center ${
                  index === 0
                    ? "pr-4 sm:pr-6 lg:pr-8"
                    : index === 2
                    ? "pr-4 sm:pr-6 lg:pr-8 lg:pl-7 xl:pl-8"
                    : "pl-5 sm:pl-7 lg:pl-7 xl:pl-8 pr-4 sm:pr-6 lg:pr-8"
                }`}
              >
                {/* Thin Vertical Divider matching reference geometry */}
                {hasDesktopDivider && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[38px] bg-[#D7E7F1] ${
                      hasMobileDivider ? "block" : "hidden lg:block"
                    }`}
                    aria-hidden="true"
                  />
                )}

                {/* Content Block */}
                <div>
                  <h3 className="text-sm sm:text-[15px] lg:text-base font-bold text-[#063572] leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#54748F] font-normal leading-normal mt-0.5 sm:mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

