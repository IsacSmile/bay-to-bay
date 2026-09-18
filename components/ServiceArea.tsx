import React from "react";
import { getRegionsData, getServiceAreaData } from "@/lib/prisma";
import { ServiceAreaInteractive } from "@/components/service-area/ServiceAreaInteractive";

export async function ServiceArea() {
  const regions = await getRegionsData();
  const serviceAreaContent = await getServiceAreaData();

  return (
    <section
      id="service-areas"
      className="w-full bg-[#F6F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceAreaInteractive
          regions={regions}
          serviceAreaContent={serviceAreaContent}
        />
      </div>
    </section>
  );
}
