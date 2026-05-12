import React from "react";
import type { Metadata } from "next";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import HeaderTwo from "@/components/HeaderTwo";
import BannerTwo from "@/components/BannerTwo";
import AboutTwo from "@/components/AboutTwo";
import ServiceTwo from "@/components/ServiceTwo";
import ExperienceOne from "@/components/ExperienceOne";
import FeatureTwo from "@/components/FeatureTwo";
import RelaxingOne from "@/components/RelaxingOne";
import DiscoverOne from "@/components/DiscoverOne";
import PricingTwo from "@/components/PricingTwo";
import NewsletterOne from "@/components/NewsletterOne";
import ContactOne from "@/components/ContactOne";
import MarqueeTwo from "@/components/MarqueeTwo";
import ClientTwo from "@/components/ClientTwo";
import BlogTwo from "@/components/BlogTwo";
import InstagramAreaOne from "@/components/InstagramAreaOne";
import FooterTwo from "@/components/FooterTwo";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home-2 | EliteStay - Hotel Booking Multi-Purpose Next Js Template",
    description:
      "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
    openGraph: {
      title: "Home-2 | EliteStay",
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

      {/* HeaderTwo */}
      <HeaderTwo />

      {/* BannerTwo */}
      <BannerTwo />

      {/* AboutTwo */}
      <AboutTwo />

      {/* ServiceTwo */}
      <ServiceTwo />

      {/* ExperienceOne */}
      <ExperienceOne />

      {/* FeatureTwo */}
      <FeatureTwo />

      {/* RelaxingOne */}
      <RelaxingOne />

      {/* DiscoverOne */}
      <DiscoverOne />

      {/* PricingTwo */}
      <PricingTwo />

      {/* NewsletterOne */}
      <NewsletterOne />

      {/* ContactOne */}
      <ContactOne />

      {/* MarqueeTwo */}
      <MarqueeTwo />

      {/* ClientTwo */}
      <ClientTwo />

      {/* BlogTwo */}
      <BlogTwo />

      {/* InstagramAreaOne */}
      <InstagramAreaOne />

      {/* FooterTwo */}
      <FooterTwo />
    </AOSWrap>
  );
};

export default Page;
