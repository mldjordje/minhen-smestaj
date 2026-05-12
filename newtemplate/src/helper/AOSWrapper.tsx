import  { FC, ReactNode } from "react";

type AOSWrapperProps = {
  children: ReactNode;
};

const AOSWrapper:FC<AOSWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default AOSWrapper;
