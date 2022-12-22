import React from 'react'
import type { NextPage,GetStaticProps } from 'next'
import {Text,Grid} from '@nextui-org/react';
import styles from '@/styles/Home.module.css';


type RemoteConnectStaticProps = {
    dummy:string;
}


export const RemoteConnect:NextPage<RemoteConnectStaticProps> = (props)=>{
    return(
      <div className={styles.container}>
        <main className={styles.main}>
          <Grid.Container
          // gap={2}
          justify="center"
          alignItems="center"
          css={{ maxW:2000, marginTop:0 }}
          >
            <Text 
              h2
              css={{ textGradient: "180deg, $purple500 20%, $pink500 100%" }}
            > リモート接続</Text>
            <Grid xs={12} md={12} justify="center">

            {/* <iframe src='https://webchat.botframework.com/embed/dotnetbot-bot?s=FaRy1tSDNy0.WpPB4f5c0u0RsvQa-2H9RIfAF0DeUa3SJcl1uCYB89M' 
            width="1000" height="550" ></iframe> */}
            <iframe src='https://login.teamviewer.com/Connect'  width="1200" height="640"  ></iframe>
            </Grid>
            </Grid.Container>
        </main>
      </div>
    )




}


export const getStaticProps: GetStaticProps<RemoteConnectStaticProps> = async () => {
    console.log("Remote connect SSG running !!!\n");
    return {
      props: {
        dummy: "dummy",
      },
      // revalidate: 1,
    };
  }
  
  
  export default RemoteConnect;
  