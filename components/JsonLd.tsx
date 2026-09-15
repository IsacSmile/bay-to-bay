import React from "react";

export const JsonLd: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CourierService",
        "@id": "https://baytobayexpress.com/#service",
        "name": "Bay to Bay Express Inc. - Northern Ontario Courier Service",
        "url": "https://baytobayexpress.com",
        "logo": "https://baytobayexpress.com/bay-to-bay-logo.webp",
        "image": "https://baytobayexpress.com/bay-to-bay-logo.webp",
        "telephone": "705-978-3001",
        "email": "baytobayexpress@gmail.com",
        "priceRange": "$$",
        "description":
          "Premier Northern Ontario courier providing small goods delivery, dedicated delivery, scheduled route courier, and medical courier services across North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Bay to Bay Express Inc.",
          "telephone": "705-978-3001",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "ON",
            "addressCountry": "CA",
          },
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "North Bay",
            "description": "North Bay courier & distribution hub",
          },
          {
            "@type": "City",
            "name": "Kirkland Lake",
            "description": "Kirkland Lake delivery service & courier route",
          },
          {
            "@type": "City",
            "name": "Timmins",
            "description": "Timmins courier & regional delivery center",
          },
          {
            "@type": "City",
            "name": "Cochrane",
            "description": "Cochrane courier & express parcel service",
          },
          {
            "@type": "City",
            "name": "Kapuskasing",
            "description": "Kapuskasing courier & Highway 11 route stop",
          },
          {
            "@type": "City",
            "name": "Hearst",
            "description": "Hearst courier & destination delivery terminal",
          },
          {
            "@type": "City",
            "name": "Longlac",
            "description": "Longlac courier & Northern Ontario route connection",
          },
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Northern Ontario Delivery Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Small Goods Delivery Northern Ontario",
                "description": "Dedicated transportation for small parcels, retail supplies, and documents.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Medical Courier Northern Ontario",
                "description": "Specialized pharmacy and medical supply courier delivery.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dedicated Delivery Northern Ontario",
                "description": "Direct, non-stop dedicated courier solutions for businesses.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Scheduled Delivery Northern Ontario",
                "description": "Twice-weekly scheduled route courier connecting North Bay to Hearst.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Courier Northern Ontario",
                "description": "B2B commercial transport, transfers, and document deliveries.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
