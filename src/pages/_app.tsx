import React,{useEffect,useState}  from 'react';
import { useRouter } from 'next/router';
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider,globalCss } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {Header} from "@/component/app/Header";
import {Contents} from "@/component/app/Contents";
import {isLoginUser} from "@/users/currentUser";
import {Layout} from "@/component/app/Layout";


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



type Props = {
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};


const DefaultLayout = ({ page }: Props) => {
 
  console.log("Default layout.. !")
  return (
  <Layout>
    <Header />
    <Contents >{page}</Contents>
  </Layout>
  )
}



function MyApp({ Component, pageProps,router }: AppPropsWithLayout) {

  console.log("My app .... !")
  const getLayout =  Component.getLayout ?? ((page) => <DefaultLayout page={page} />);

  const [isLogin, setIsLogin] = useState(false);
  const routerToLogin = useRouter();


  useEffect(()=>{
    console.log("Inside hook");
    if(!isLoginUser()){
      console.log("Log in!");
      routerToLogin.push("./login");
      console.log(router.pathname);
      if(router.pathname === "/login"){
        setIsLogin(true);
      }
    }
    else{
      setIsLogin(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[router.pathname]);
  
  //ちらつき防止
  if(!isLogin){
    console.log("Exit default.")
    return null;
  }
  //
  
  const globalStyles = globalCss({
    body: { fontFamily: "Arial" }
  });

  globalStyles();
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
