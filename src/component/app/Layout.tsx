import React from 'react';
import { styled } from "@nextui-org/react";


const MyBox = styled("div", 
  {
    boxSizing: "border-box",
  }
);


export const Layout = ({children,className}:{children:React.ReactNode, className?:string|undefined}) => (
  <MyBox
    className={className}
    css={{
      maxW: "100%"
    }}
  >
    {children}
  </MyBox>
);