import type { Metadata } from "next";
import Preloader from "@/helper/Preloader";
import AOSWrap from "@/helper/AOSWrap";
import HeaderOne from "@/components/HeaderOne";
import BannerOne from "@/components/BannerOne";
import Checkout from "@/components/Checkout";
import AdvanceArea from "@/components/AdvanceArea";
import OfferOne from "@/components/OfferOne";
import FeatureOne from "@/components/FeatureOne";
import PackageOne from "@/components/PackageOne";
import ClientOne from "@/components/ClientOne";
import AboutOne from "@/components/AboutOne";
import CtaOne from "@/components/CtaOne";
import PropertiesInner from "@/components/PropertiesInner";
import PricingOne from "@/components/PricingOne";
import TestimonialOne from "@/components/TestimonialOne";
import MarqueeOne from "@/components/MarqueeOne";
import BlogOne from "@/components/BlogOne";
import FooterOne from "@/components/FooterOne";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home | EliteStay - Hotel Booking Multi-Purpose Next Js Template",
    description:
      "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
    openGraph: {
      title: "Home | EliteStay",
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

export default function Home() {
  return (
    <AOSWrap>
      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderOne />

      {/* BannerOne */}
      <BannerOne />

      {/* Checkout */}
      <Checkout />

      {/* AdvanceArea */}
      <AdvanceArea />

      {/* OfferOne */}
      <OfferOne />

      {/* FeatureOne */}
      <FeatureOne />

      {/* PackageOne */}
      <PackageOne />

      {/* ClientOne */}
      <ClientOne />

      {/* AboutOne */}
      <AboutOne />

      {/* CtaOne */}
      <CtaOne />

      {/* PropertiesInner */}
      <PropertiesInner />

      {/* PricingOne */}
      <PricingOne />

      {/* TestimonialOne */}
      <TestimonialOne />

      {/* MarqueeOne */}
      <MarqueeOne />

      {/* BlogOne */}
      <BlogOne />

      {/* FooterOne */}
      <FooterOne />
    </AOSWrap>
  );
}
