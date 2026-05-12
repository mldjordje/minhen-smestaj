import React from "react";
import type { Metadata } from "next";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import HeaderTwo from "@/components/HeaderTwo";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import Checkout from "@/components/Checkout";
import MarqueeFour from "@/components/MarqueeFour";
import OfferInner from "@/components/OfferInner";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Offers | EliteStay - Hotel Booking Multi-Purpose Next Js Template",
    description:
      "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
    openGraph: {
      title: "Offers | EliteStay",
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

      {/* Breadcrumb */}
      <Breadcrumb title='Offers' sub_title='Experience the Story' />

      {/* Checkout */}
      <section className=' bg_2'>
        <Checkout />
      </section>

      {/* OfferInner */}
      <OfferInner />

      {/* MarqueeFour */}
      <MarqueeFour />

      {/* FooterOne */}
      <FooterOne />
    </AOSWrap>
  );
};

export default Page;
