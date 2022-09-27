import React  from 'react';
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import PasswordInput from './login';
import Home from "./index";
import {Header} from "@/component/app/Header";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {
    // colors: {...}, // optional
  },
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    // colors: {...}, // optional
  }
})





// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <NextThemesProvider
//       defaultTheme="system"
//       attribute="class"
//       value={{
//         light: lightTheme.className,
//         dark: darkTheme.className
//       }}
//     >
//       <NextUIProvider>
//         <PasswordInput  />
//         <Component {...pageProps} />
//       </NextUIProvider>
//     </NextThemesProvider>
//   );
// }


type Props = {
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};


const DefaultLayout = ({ page }: Props) => {
  // const  isActive  = useHeaderScroll();
  const isActive = true;
  console.log("DEBUG ******* Default layout! *********");
  return(
  <div className="global-layout">
    <PasswordInput />
    <Header className="global-layout__header" show={isActive} />
    <Home />
    
    {/* <Contents className="global-layout__contents">{page}</Contents> */}
  </div>
  )
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout page={page} />);

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        {getLayout(<Component {...pageProps} />)}
      </NextUIProvider>
    </NextThemesProvider>
  );
}



export default MyApp
