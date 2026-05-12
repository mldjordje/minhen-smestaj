import React from "react";
import type { Metadata } from "next";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import HeaderThree from "@/components/HeaderThree";
import BannerThree from "@/components/BannerThree";
import AboutThree from "@/components/AboutThree";
import PropertiesInnerTwo from "@/components/PropertiesInnerTwo";
import MarqueeThree from "@/components/MarqueeThree";
import AdvanceAreaTwo from "@/components/AdvanceAreaTwo";
import ServiceThree from "@/components/ServiceThree";
import MarqueeFour from "@/components/MarqueeFour";
import BrandOne from "@/components/BrandOne";
import ContactTwo from "@/components/ContactTwo";
import BlogThree from "@/components/BlogThree";
import ReservationOne from "@/components/ReservationOne";
import FooterThree from "@/components/FooterThree";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home-3 | EliteStay - Hotel Booking Multi-Purpose Next Js Template",
    description:
      "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
    openGraph: {
      title: "Home-3 | EliteStay",
      description:
        "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
      url: "https://nextjs.elitestay.wowtheme7.com",
      type: "website",
      images: [
        {
          url: "https://nextjs.elitestay.wowtheme7.com/images/meta.png",
          width: 1200,
          height: 630,
          alt: "elitestay",
        },
      ],
    },
  };
};

const Page: React.FC = () => {
  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* HeaderThree */}
      <HeaderThree />

      {/* BannerThree */}
      <BannerThree />

      {/* AboutThree */}
      <AboutThree />

      {/* PropertiesInnerTwo */}
      <PropertiesInnerTwo />

      {/* MarqueeThree */}
      <MarqueeThree />

      {/* AdvanceAreaTwo */}
      <AdvanceAreaTwo />

      {/* ServiceThree */}
      <ServiceThree />

      {/* MarqueeFour */}
      <MarqueeFour />

      {/* BrandOne */}
      <BrandOne />

      {/* ContactTwo */}
      <ContactTwo />

      {/* BlogThree */}
      <BlogThree />

      {/* ReservationOne */}
      <ReservationOne />

      {/* FooterThree */}
      <FooterThree />
    </AOSWrap>
  );
};

export default Page;
