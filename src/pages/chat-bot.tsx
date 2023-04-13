import React from 'react'
import type { NextPage,GetStaticProps } from 'next'
import {Text,Grid} from '@nextui-org/react';
import styles from '@/styles/Home.module.css';
import {ChatUI} from '@/component/app/ChatUI';


type ChatBotStaticProps = {
    dummy:string;
}

export const ChatBot:NextPage<ChatBotStaticProps> = (props)=>{
    return(
      <div className={styles.container}>
        <video
        className={styles.bot_backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%' }}
        crossOrigin="anonymous" // 追加
       
        onLoadedData={(e) => {
          (e.target as HTMLVideoElement).play(); // 型アサーションを追加
        }}
        >  
        <source
          src="https://carisxblob.blob.core.windows.net/bot-resource/_import_61b58c54b465f9.62502902_FPpreview.mp4"
          type="video/mp4"
        />
        </video>
 
        <div className={styles.bot_mainWrapper}> {/* この行が追加されました */}
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
            > FR13 Chat Bot</Text>
            <Grid xs={12} md={12} justify="center">
            <ChatUI />
            </Grid>
            </Grid.Container>
        </main>
        </div>
      </div>
    )




}


export const getStaticProps: GetStaticProps<ChatBotStaticProps> = async () => {
    console.log("ChatBot SSG running !!!\n");
    return {
      props: {
        dummy: "dummy",
      },
      // revalidate: 1,
    };
  }
  
  
  export default ChatBot;
  