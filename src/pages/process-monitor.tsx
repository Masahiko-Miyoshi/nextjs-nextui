import React from 'react'
import type { NextPage,GetStaticProps } from 'next'
import {Grid} from '@nextui-org/react';
import styles from '@/styles/Home.module.css';
import {LinkCardWithImage} from '@/component/app/LinkCardWithImage';



type ProcessMonitorStaticProps = {
    fileList: string[];
}



export const ProcessMonitor:NextPage<ProcessMonitorStaticProps> = (props)=>{
    const {fileList} = props;
    
    return(
      <div className={styles.container}>
        <main className={styles.main}>
          <Grid.Container
          gap={2}
          justify="center"
          alignItems="center"
          css={{ maxW:2000, marginTop:50 }}
          >
            { fileList.map((item,index)=>{
              const imageUrl = "https://carisxblob.blob.core.windows.net/process-monitor/"+item;
              return(
              <Grid  key = {index} xs={12} md={6} xl={4} justify="center">
                  <LinkCardWithImage title={"検体吸引状態 (Serial no "+(index+1)+")"} imageUrl={imageUrl}  />
              </Grid>
              )
            })}
          </Grid.Container>
        </main>
          
      </div>
    )   
}





export const getStaticProps: GetStaticProps<ProcessMonitorStaticProps> = async () => {
   
    return {
      props: {
        fileList:["OK1.png","OK2.png","OK3.png","OK4.png","OK5.png","OK6.png","OK7.png"]
      }
      // revalidate: 1,
    };
  }
  
  
  export default ProcessMonitor;
