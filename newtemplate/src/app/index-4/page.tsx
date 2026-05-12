import React from "react";
import type { Metadata } from "next";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import HeaderFour from "@/components/HeaderFour";
import BannerFour from "@/components/BannerFour";
import Checkout from "@/components/Checkout";
import AboutFour from "@/components/AboutFour";
import ServiceOne from "@/components/ServiceOne";
import RelaxingTwo from "@/components/RelaxingTwo";
import MarqueeFive from "@/components/MarqueeFive";
import DiscoverTwo from "@/components/DiscoverTwo";
import ExperienceTwo from "@/components/ExperienceTwo";
import ChooseOne from "@/components/ChooseOne";
import PackageTwo from "@/components/PackageTwo";
import ContactThree from "@/components/ContactThree";
import BlogFour from "@/components/BlogFour";
import FooterFour from "@/components/FooterFour";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home-4 | EliteStay - Hotel Booking Multi-Purpose Next Js Template",
    description:
      "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
    openGraph: {
      title: "Home-4 | EliteStay",
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

      {/* HeaderFour */}
      <HeaderFour />

      {/* BannerFour */}
      <BannerFour />

      {/* CheckoutOne */}
      <Checkout />

      {/* AboutFour */}
      <AboutFour />

      {/* ServiceOne */}
      <ServiceOne />

      {/* RelaxingTwo */}
      <RelaxingTwo />

      {/* MarqueeFive */}
      <MarqueeFive />

      {/* DiscoverTwo */}
      <DiscoverTwo />

      {/* ExperienceTwo */}
      <ExperienceTwo />

      {/* ChooseOne */}
      <ChooseOne />

      {/* PackageTwo */}
      <PackageTwo />

      {/* ContactThree */}
      <ContactThree />

      {/* BlogFour */}
      <BlogFour />

      {/* FooterFour */}
      <FooterFour />
    </AOSWrap>
  );
};

export default Page;
