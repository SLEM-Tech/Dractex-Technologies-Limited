"use client";
import { Skeleton } from "@heroui/react";
import ContactCard from "@src/components/Cards/ContactCard";
import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";

const ContactCards = () => {
  const { data: generalSettings, isLoading, isError } = useGeneralSettings();

  const GeneralSettings: WooCommerceSetting[] = generalSettings;

  // console.log("GeneralSettings", GeneralSettings);

  const contactCardData = [
    {
      id: 1,
      title: "Email Us",
      type: "email",
      icon: <RxEnvelopeClosed className="text-primary text-2xl xl:text-4xl" />,
      additionalText: "britney.silve-r-@email4.in",
    },
    {
      id: 2,
      title: "Call Us",
      icon: <FiPhoneCall className="text-primary text-2xl xl:text-4xl" />,
      type: "tel",
      additionalText: "8084564240",
    },
    {
      id: 3,
      title: "Location",
      type: "text",
      icon: <IoLocationOutline className="text-primary text-2xl xl:text-4xl" />,
      description: "AYINLA MUFUTAU, 12, Harmony est/ate Osagie okeira nla Ajah",
    },
    // Add more contact card data here if needed
  ];
  return (
    <>
      {contactCardData?.map((card) => (
        <ContactCard
          key={card.id}
          isLoading={false}
          type={card.type}
          title={card.title}
          icon={card.icon}
          additionalText={card.additionalText}
          // additionalText2={card.additionalText2}
          description={card.description}
        />
      ))}
    </>
  );
};

export default ContactCards;
