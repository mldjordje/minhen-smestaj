"use client";

import React, { FC, ReactNode } from "react";
import AOSWrapper from "./AOSWrapper";
import InitializeAOS from "./InitializeAOS";

type AOSWrapProps = {
  children: ReactNode;
};

const AOSWrap:FC<AOSWrapProps> = ({ children }) => {
  return (
    <AOSWrapper>
      <InitializeAOS />
      {children}
    </AOSWrapper>
  );
};

export default AOSWrap;
