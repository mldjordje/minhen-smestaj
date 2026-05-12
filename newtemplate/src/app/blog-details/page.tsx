import React from "react";
import type { Metadata } from "next";
import AOSWrap from "@/helper/AOSWrap";
import Preloader from "@/helper/Preloader";
import HeaderTwo from "@/components/HeaderTwo";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import ReservationOne from "@/components/ReservationOne";
import BlogDetailsInner from "@/components/BlogDetailsInner";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title:
      "Blog Details | EliteStay - Hotel Booking Multi-Purpose Next Js Template",
    description:
      "EliteStay is a professional Next JS Template for Hotel Booking Multi-Purpose services. Clean design, responsive layout, and modern UI components included.",
    openGraph: {
      title: "Blog Details | EliteStay",
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
      <Breadcrumb title='Blog Details' sub_title='Experience the Story' />

      {/* BlogDetailsInner */}
      <BlogDetailsInner />

      {/* MarqueeFour */}
      <ReservationOne />

      {/* FooterOne */}
      <FooterOne />
    </AOSWrap>
  );
};

export default Page;
