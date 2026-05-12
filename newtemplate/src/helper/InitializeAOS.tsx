"use client";

import { FC, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const InitializeAOS: FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    AOS.init({ once: true });
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return null;
};

export default InitializeAOS;
