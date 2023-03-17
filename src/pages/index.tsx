import React, { useEffect, useState } from "react";
import type { NextPage,GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {LinkCardWithArea} from '@/component/app/LinkCardWithArea';
import type {AreaDataFormat,AreaGraphProps} from '@/component/app/LinkCardWithArea';
import {LinkCardWithPie} from '@/component/app/LinkCardWithPie';
import type {PieGraphProps} from '@/component/app/LinkCardWithPie';
import { Card, Button, Switch,Grid, Text, Spacer,} from '@nextui-org/react';
import {Logo} from '@/component/common/Logo';
import {LinkCardWithBar} from "@/component/app/LinkCardWithBar";
import type {BarGraphProps} from "@/component/app/LinkCardWithBar";
// import dynamic from "next/dynamic";
// const BarGraph = dynamic(
//   import("@/component/app/BarGraph"),
//   { ssr: false }
// );
import type {LabelFormat,AnyJson} from "@/component/app/LinkCardWithBar";
import {getPastelColor} from "@/styles/color";
import { sendStatusCode } from "next/dist/server/api-utils";
import { getCurrentUser } from "@/users/currentUser";
import next from "next/types";


// Homeページへの引数
type HomeStaticProps = {
  dummy:string;
}


const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
  

const makeTime = (): string => {
  
  return "14:10"
}


//*** 本日の検査数の推移を表すグラフコンポーネント ***//
const CurerntTests = () =>{
  const initialValue:AreaGraphProps = {
    dummy: "sss",
    data : [
      {
        Time: '8:00',
        Value1: 10,
        Value2: 3,
      },
      {
        Time: '9:00',
        Value1: 210,
        Value2: 128,
      },
      {
        Time: '10:00',
        Value1: 527,
        Value2: 231,
      },
      {
        Time: '11:00',
        Value1: 770,
        Value2: 345,
      },
      {
        Time: '12:00',
        Value1: 690,
        Value2: 454,
      },
      {
        Time: '13:00',
        Value1: 200,
        Value2: 123,
      },
      {
        Time: '14:00',
        Value1: 150,
        Value2: 74,
      },
    ],
  }
  const [data,setData] = useState<AreaDataFormat[]>(initialValue.data);
  


  useEffect(()=>{
    const intervalId:NodeJS.Timer = setInterval(()=>
      {
          fetchData();
      }, 1000);
    return ()=>{
      clearInterval(intervalId);
    } 
  },
  []);


  const fetchData = async () => {
    const response = await fetch('/api/azuredb/?table=ChinaNoOfTestTodayView');
    const respJson:AreaDataFormat[] = await response.json();
// Dummy data for DEMO
    const nextItem:AreaDataFormat = {Time:makeTime(), Value1:randomIntFromInterval(1,700),Value2:randomIntFromInterval(1,700)}
    respJson.push(nextItem);
//
    setData(respJson)
  }

  const areaGraphProps: AreaGraphProps = {
    dummy: "sss",
    data : [...data]
  }
    

  return(
      <LinkCardWithArea url="https://nextjs.org/docs" title="現在の総検査数" 
      areaGraphProps={areaGraphProps}
      footerText="クリックすると詳細情報を確認できます"
      />
  )
}


//*** 本日のエラー数の推移を表すグラフコンポーネント ***//

const CurerntError = () =>{
  const initialValue:AreaGraphProps = {
    dummy: "sss",
    data : [
      {
        Time: '8:00',
        Value1: 1,
        Value2: 3,
      },
      {
        Time: '9:00',
        Value1: 2,
        Value2: 1,
      },
      {
        Time: '10:00',
        Value1: 5,
        Value2: 2,
      },
      {
        Time: '11:00',
        Value1: 7,
        Value2: 3,
      },
      {
        Time: '12:00',
        Value1: 6,
        Value2: 4,
      },
      {
        Time: '13:00',
        Value1: 2,
        Value2: 1,
      },
      {
        Time: '14:00',
        Value1: 10,
        Value2: 7,
      },
    ],
  }

  const [data,setData] = useState<AreaDataFormat[]>(initialValue.data);
  


  useEffect(()=>{
    const intervalId:NodeJS.Timer = setInterval(()=>
      {
          fetchData();
      }, 1000);
    return ()=>{
      clearInterval(intervalId);
    } 
  },
  []);

  const fetchData = async () => {
    const response = await fetch('/api/azuredb/?table=ChinaNoOfTestTodayView');
    const respJson:AreaDataFormat[] = await response.json();
// Dummy data for DEMO
   
    const nextItem:AreaDataFormat = {Time:makeTime(), Value1:randomIntFromInterval(1,200),Value2:randomIntFromInterval(1,200)}
    respJson.push(nextItem);
//
    setData(respJson)
  }

  const areaGraphProps: AreaGraphProps = {
    dummy: "sss",
    data : [...data]
  }

  return(
      <LinkCardWithArea  url="https://nextjs.org/docs" title="現在の総エラー数" 
      areaGraphProps={areaGraphProps}
      footerText="クリックすると詳細情報を確認できます"
      />
  )
}


//*** 検査数の多い施設名を表すグラフコンポーネント ***//
const BigUser = () =>{
  const pieGraphProps:PieGraphProps = {
   
    data : [
      {
        name: '大阪病院',
        value: 112342,
      },
      {
        name: '東京病院',
        value: 122999,
      },
      {
        name: '北海道病院',
        value: 122435,
      },
      {
        name: '愛知病院',
        value: 133313,
      },
      {
        name: '福岡病院',
        value: 23431,
      },
      
    ],
    pieType:"donuts"
  }
  return(
      <LinkCardWithPie   url="https://nextjs.org/docs" title="ビッグユーザー Top 5" 
      pieGraphProps={pieGraphProps}
      footerText="クリックすると詳細情報を確認できます"
      />
  )
}



//*** 消費量の多い試薬を表すグラフコンポーネント ***//
const  TypicalAnalytes= () =>{
  const pieGraphProps:PieGraphProps = {
   
    data : [
      {
        name: 'AFP',
        value: 2123,
      },
      {
        name: 'CEA',
        value: 2399,
      },
      {
        name: 'HBsAg',
        value: 4456,
      },
      {
        name: 'HBsAb',
        value: 4562,
      },
      {
        name: 'Cov19',
        value: 3245,
      },
      
    ],
    pieType:"pie"
  }
  return(
      <LinkCardWithPie   url="https://nextjs.org/docs" title="検査試薬 Top 5" 
      pieGraphProps={pieGraphProps}
      footerText="クリックすると詳細情報を確認できます"
      />
  )
}

//*** 消費量の多い試薬を表すグラフコンポーネント ***//
const  ChinaReagConsume= () =>{
 
 

//  const initValue:dataFormat[] = [
  const initValue:AnyJson[] = [
      { Date: "2020-09-01", AFP: 123, CEA: 240, CV19: 212, AAA:234},
      { Date: "2020-09-02", AFP: 43, CEA: 139 },
      { Date: "2020-09-03", AFP: 23, CEA: 100, CV19: 32 },
      { Date: "2020-09-04", AFP: 231, CEA: 18 },
      { Date: "2020-09-05", AFP: 143, CEA: 48, CV19: 122 },
      { Date: "2020-09-06", AFP: 29, CEA: 38 },
      { Date: "2020-09-07", AFP: 23, CEA: 43 },
    ]

  const initialInputLabels:LabelFormat[] = [
    { key: "HIV", color: "#8884d8" },
    { key: "HBsAg", color: "#82ca9d" },
    { key: "CV19", color: "#81cc2d" },
    { key: "BBB", color: "#01cc2d" },

  ];
  
  
  const [data,setData] = useState<AnyJson[]>(initValue);
  const [inputLabels,setInputLabels] = useState<LabelFormat[]>(initialInputLabels);
  const [udpateGraph,setUpdateGraph] = useState<boolean>(false);


  useEffect(()=>{
    const intervalId:NodeJS.Timer = setInterval(()=>
      {
        console.log("Parent:",udpateGraph);
        if(udpateGraph){
          fetchData();
        }
        
    }, 1000);
    return ()=>{
      clearInterval(intervalId);
    } 
  },
  [udpateGraph]);

  const fetchData = async () => {
    const response = await fetch('/api/azuredb/?table=ChinaReagConsume');
    const respJson:AnyJson[] = await response.json();
    
    let completedValue:AnyJson={};
    let updateValue:AnyJson={};
    let allValue:AnyJson={};
   

    /*
      Convert JSON format 
      from 
                  Date:**** Analytes:AnalyteName NoOfAnalytes:number 
      to 
                  Date:**** AnalyteName: number 
    */

    
    // const respDataConv1:AnyJson[] = [];
    // for(const value of respJson){
    //   const respValue : AnyJson ={};
    //   respValue["Date"] = value["Date"];
    //   respValue[value["Analytes"]] = value["NoOfAnalytes"];
    //   respDataConv1.push(respValue);
    // }

    const respDataConv1:AnyJson[] = [];
    for(const value of respJson){
      const respValue : AnyJson ={};
      const date:string = value.Date.slice(0,10);
      respValue["Date"]=date;
      respValue["Analytes"] = value["Analytes"];
      respValue["NoOfAnalytes"] = value["NoOfAnalytes"];
      respDataConv1.push(respValue);
    }
    
   

    /*
      Merge Same Days into One
      Convert from  
            Date:**** AnalyteName: number
            Date:**** AnalyteName2: number2
            Date:**** AnalyteName3: number3

      to 
            Date:**** AnalyteName: number AnalyteName2: number2 AnalyteName3: number3 .... 
    */

            // respDataConv1テーブル配列から、JSON形式のrespDataMergeDayに変換
/*
    const respDataMergeDay: AnyJson[]= respDataConv1.map((value,index)=>{
      if(value === null) return null;
      const date:string = value.Date.slice(0,10);
      value["Date"]=date;
     
      let nextDate = null;
      if(index < respDataConv1.length-1){
        nextDate = respDataConv1[index+1]?.Date.slice(0,10);
      }
  // キーの連結
      updateValue = {...updateValue,...value};
      allValue = {...allValue,...value};
      completedValue = updateValue;
  // キーの連結が終了する条件
      
      //最終レコード
      if(index === respDataConv1.length-1){
        return completedValue;
      }
      // 今のレコードと次のレコードの日付が違う
      else if(date !== nextDate){
        updateValue ={};
        return completedValue;
      }
      else{
        return null;
      }
  //
    }).filter(value=>value) as AnyJson[];
   
    console.log("1111",respDataMergeDay);
    setData(respDataMergeDay);
*/




    interface Result {
      Date: string;
      [key: string]: number | string;
    }
    
    const result: Result[] = [];
    
    respDataConv1.forEach((row) => {
      const existingRow = result.find((r) => r.Date === row.Date);
      if (existingRow) {
        existingRow[row.Analytes] = row.NoOfAnalytes;
        allValue = {...allValue,[row.Analytes]: row.NoOfAnalytes};
       
      } else {
        const newRow = {
          Date: row.Date,
          [row.Analytes]: row.NoOfAnalytes,
          
        };
        allValue = {...allValue,...newRow};
        result.push(newRow);
        
      }
    });
    setData(result);
    console.log("3333",result);



    const num = Object.keys(allValue).length;
    const colors:string[] = getPastelColor(num);
    let counter = 0;
    const labels:LabelFormat[]  = [];
    for(const key of Object.keys(allValue)){
      if(key ==="Date") continue;
      const color:LabelFormat = {"key":key, "color":colors[counter++]};
      labels.push(color) ;
    }
    setInputLabels(labels);
   
  }
  const barGraphProps:BarGraphProps = {
    dataKey: "Date",
    oyLabel: "検査数",
    oxLabel: "日時",
    yLimit:[0,1],
    values:[...data],
    labels:[...inputLabels] 
  };

  
  return (
      <LinkCardWithBar title="検査試薬消費推移" 
      barGraphProps={barGraphProps}
      footerText="クリックすると詳細情報を確認できます" setUpdateGraph={setUpdateGraph}
      />
  );
}

const PowerBI = () =>
{
  const currentUser = getCurrentUser();
  let powerBIUrl;
  if( currentUser?.userName === "miyoshi"){
    powerBIUrl = "https://app.powerbi.com/reportEmbed?reportId=bb371fdb-78bf-450a-b78c-648d5d369b54&autoAuth=true&ctid=09d9da34-67f1-4f24-80d2-775815aa0c46&filter=ResultData/Hospital eq 'Nagoya'" 
  }
  else if(currentUser?.userName === "masahiko"){
    powerBIUrl = "https://app.powerbi.com/reportEmbed?reportId=bb371fdb-78bf-450a-b78c-648d5d369b54&autoAuth=true&ctid=09d9da34-67f1-4f24-80d2-775815aa0c46&filter=ResultData/Hospital eq 'Osaka'" 
  }
  return(

      <Card isHoverable  variant = "bordered" css={{ mw: "1400px"}}>
        <Card.Header>
        <Text  b size = {20} color="secondary" 
        css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}> PowerBI </Text>
        </Card.Header>
        <Card.Body>
          
          <iframe title="raegent3" width="1300" height="541.25" src={powerBIUrl} ></iframe>
        </Card.Body>

        <Card.Footer>
          <Text size="12px" > PowerBI </Text>
        </Card.Footer>
      </Card>
  )
}



const Home: NextPage<HomeStaticProps> = (props) => {

   return (
    <div className={styles.container}>
      <Head>
        <title>FR13 IoT system</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Text size={60} h1 b css={{ textGradient: "180deg, $purple500 20%, $pink500 100%"}}>
          Welcome to IoT system !
        </Text>

        
      <Grid.Container
        gap={2}
        justify="center"
        alignItems="center"
        css={{ maxW:2000, marginTop:50 }}
      >
        
        <Grid xs={12} md={6} xl={4} justify="center">
          <CurerntTests/>
        </Grid>
        <Grid xs={12} md={6} xl={4} justify="center">
          <CurerntError/>
        </Grid>
        
        <section id="POS_ANALYTES" />s
        <Grid xs={12} md={6} xl={4} justify="center">
          <BigUser/>
        </Grid>

        <Grid xs={12} md={6} xl={4} justify="center">
          <TypicalAnalytes/>
        </Grid>
        <Spacer y={1}/>
        <Grid xs={12} md={12} xl={12} justify="center">
          <ChinaReagConsume/>
        </Grid>

        <Spacer y={1}/>
        <Grid xs={12} md={12} xl={12} justify="center">

          {/* <iframe src='https://fr13botapp.azurewebsites.net/' 
          width="1000" height="450" ></iframe> */}
          <PowerBI />
          
        </Grid>

      </Grid.Container>
      </main>
      <footer className={styles.footer}>
        <Logo/>
        <a
          href="https://otsukael.jp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Otsuka electronics Co, Ltd.
          
        </a>
      </footer>
    </div>
  )
}


export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  console.log("Home SSG running !!!\n");
  
  // BLOBストレージのファイル一覧取得
  // var azure = require('azure-storage');
  //   var blobService = azure.createBlobService("carisxblob", 
  //                                             "1+fxsZhM/7bVVYmHgybtXCfyB7aFIzR6nROb+4B7zdLJIQMrYU7d3wHGaQdE16hd+BE52CQLadMRophwIfQb0A==");
  //   blobService.listBlobsSegmented("bot-resource", null, function (error:any, result:any) {
  //       if (!error) {
  //           console.log(result.entries);
  //       }
  //   });

  return {
    props: {
      dummy: "dummy",
    },
    // revalidate: 1,
  };
}


export default Home;
