"use client";
import React from "react";
import { motion } from "framer-motion";
import FooterCard from "../Cards/FooterCard";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTiktok,
  BiLogoWhatsapp,
} from "@node_modules/react-icons/bi";

interface footerDataProps {
  title: string;
  links: {
    label: string;
    href: string;
    function?: () => void;
  }[];
}

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { data: customer, isLoading, isError } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;
  const footer1socialMediaIcons = [
    {
      id: 1,
      icon: <BiLogoTiktok className="text-2xl sm:text-3xl text-white" />,
      link: "",
      backgroundColor: "bg-gray-900",
    },
    {
      id: 2,
      icon: <BiLogoWhatsapp className="text-2xl sm:text-3xl text-white" />,
      link: "",
      backgroundColor: "bg-whatsapp",
    },
    // {
    // 	id: 2,
    // 	icon: <Iconbi.BiLogoTwitter className='text-lg sm:text-2xl text-white' />,
    // 	link: "#",
    // 	backgroundColor: "bg-[#3CF]",
    // },
  ];

  const footerCardData = [
    {
      icon: <RocketIconSvg />,
      name: "Delivery Assistance",
      description: "Seller Online Delivery",
    },
    {
      icon: <FileIconSvg />,
      name: "Secure Purchase",
      description: "100% Secure Payment",
    },
    {
      icon: <ChatServiceIconSvg />,
      name: "Unmatched Service",
      description: "Dedicated Support",
    },
  ];

  const footerData: footerDataProps[] = [
    {
      title: "Account",
      links: [
        {
          label: firstName ? "Update Account" : "Create Account",
          href: firstName ? "/user/account-details" : "/user/register",
        },
        {
          label: firstName ? "Log Out" : "Login",
          href: firstName ? "" : "/user/login",
          function: firstName ? signOut : () => {},
        },
        {
          label: firstName ? "Change Password" : "Forget Password",
          href: firstName ? "/user/change-password" : "/user/forget-password",
        },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/contact-us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
        { label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
        { label: "Delivery & Shipping", href: "/terms-of-use?delivery-return" },
        { label: "Refund Policy", href: "/terms-of-use?refund-policy" },
      ],
    },
  ];

  const productCards = footerCardData.map((item, index) => (
    <FooterCard
      key={index}
      icon={item.icon}
      name={item.name}
      description={item.description}
      borderRight={index !== footerCardData.length - 1}
    />
  ));

  const staggerDelay = 0.2;

  return (
    <footer className="bg-background w-full py-2 flex flex-col item-center">
      <div className="mx-auto max-w-[1400px] w-full hidden slg:block">
        <section className="flex justify-center gap-16 mt-2">
          <div className="flex flex-col gap-4 w-[80%]">
            <LogoImage className="!w-[20px] lg:!w-[30px] rounded-sm" />

            <div className="flex gap-1">
              {footer1socialMediaIcons.map((item, index) => (
                <motion.a
                  href={item.link}
                  key={index}
                  className={`p-1 rounded-full ${item.backgroundColor} transition-[.5] hover:!-translate-y-1 hover:scale-110`}
                  initial={{ opacity: 0, scale: 1 }} // Initial position (opacity 0, y-axis offset 20px, and slightly smaller)
                  animate={{ opacity: 1, scale: 0.8 }} // Target position (fully opaque, no offset, and original size)
                  transition={{ delay: index * staggerDelay, duration: 0.5 }} // Stagger the animation delay based on index and set duration
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex gap-4 w-full pt-3">
            {footerData.map((section, index) => (
              <div key={index} className="flex flex-col gap-4 lg:gap-5 w-full">
                <span className="text-black font-medium text-base leading-[1.6]">
                  {section.title}
                </span>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    onClick={link.function}
                    className="text-black/80 text-sm leading-[1.3] hover:text-primary-100 transition-[.3]">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="justify-center mt-8 mb-2 hidden slg:flex">
        <hr className="w-full bg-primary-400/40" />
      </div>

      <div className="mx-auto flex w-full flex-col slg:hidden mb-4">
        <section className="flex flex-col gap-8 mt-6 px-6">
          <div className="flex flex-col gap-6">
            <div className="">
              <LogoImage className="!w-[40px]" />
            </div>

            <div className="flex gap-3">
              {footer1socialMediaIcons.map((item, index) => (
                <motion.a
                  href={item.link}
                  key={index}
                  className={`p-2 rounded-full ${item.backgroundColor} shadow-sm transition-all hover:-translate-y-1`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * staggerDelay, duration: 0.4 }}>
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-4 border-t border-gray-100">
            {footerData.map((section, index) => (
              <div key={index} className="flex flex-col gap-4">
                <span className="text-black font-bold text-sm tracking-wide uppercase">
                  {section.title}
                </span>

                <div className="flex flex-col gap-3">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className={`${link.href === pathname ? "text-primary font-semibold" : "text-gray-600"} text-sm hover:text-primary transition-colors leading-relaxed`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[1156px]">
        <div className="flex items-center justify-center py-2">
          <div className="text-gray-700 sm:font-mono text-xs leading-[1.2]">
            Copyright&nbsp;@ {currentYear}&nbsp;{CompanyName} Alright Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
