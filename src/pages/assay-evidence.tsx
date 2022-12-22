import React, { Key, useState } from 'react'
import type { NextPage,GetStaticProps } from 'next'
import {Link,Button,Navbar,Text,Grid,Table} from '@nextui-org/react';
import Router from "next/router";

import confetti from 'canvas-confetti';
import { DlgConfirm } from '../component/common/DlgConfirm';
import styles from '@/styles/Home.module.css';

type ErrorListStaticProps = {
    dummy:string,
}

type EvidenceInfo = {
  key: string,
  name: string,
  serialNo: string,
  sequenceNo: string,
  sampleID: string,
  analytes: string,
  result: string,
  dateTime: string,
  

}


export const ErrorList:NextPage<ErrorListStaticProps> = (props)=>{


  const columns = [
   
    {
      key: "name",
      label: "施設名",
    },
    {
      key: "serialNo",
      label: "シリアル番号",
    },
    {
      key: "sequenceNo",
      label: "シーケンス番号",
    },
    {
      key: "sampleID",
      label: "検体ID",
    },
    {
      key: "analytes",
      label: "検査項目",
    },
    {
      key: "result",
      label: "測定結果",
    },
    {
      key: "dateTime",
      label: "測定日時",
    },

  ];

  const rows: EvidenceInfo[] = [
    {
      key: "1",
      dateTime: "2022/2/3 9:32:34",
      name: "大阪府済生会泉尾病院",
      serialNo: "321",
      sequenceNo: "1",
      sampleID: "456100032",
      analytes:"AFP",
      result: "0.3",
    },
    {
      key: "2",
      dateTime: "2022/2/1 17:1:23",
      name: "大阪赤十字病院",
      serialNo: "12",
      sequenceNo: "1",
      sampleID: "33100032",
      analytes:"AFP",
      result: "0.6",
    },

    {
      key: "3",
      dateTime: "2022/2/3 11:12:34",
      name: "近畿大学病院",
      serialNo: "211",
      sequenceNo: "36",
      sampleID: "56100032",
      analytes:"AFP",
      result: "0.4",
    },
   
    {
      key: "4",
      dateTime: "2022/2/1 12:12:34",
      name: "旭川医療センター",
      serialNo: "654",
      sequenceNo: "211",
      sampleID: "456100032",
      analytes:"AFP",
      result: "0.1",
    },
    {
      key: "5",
      dateTime: "2022/2/1 10:23:1",
      name: "旭川医療センター",
      serialNo: "654",
      sequenceNo: "1",
      sampleID: "84198732",
      analytes:"CEA",
      result: "****",
    },
    {
      key: "6",
      dateTime: "2022/2/1 10:10:33",
      name: "旭川医療センター",
      serialNo: "654",
      sequenceNo: "14",
      sampleID: "567100032",
      analytes:"AFP",
      result: "0.3",
    },
    {
      key: "7",
      dateTime: "2022/2/1 9:12:23",
      name: "板橋区医師会病院",
      serialNo: "196",
      sequenceNo: "18",
      sampleID: "111043032",
      analytes:"AFP",
      result: "****",
    },
    {
      key: "8",
      dateTime: "2022/2/1 9:4:1",
      name: "池上総合病院",
      serialNo: "452",
      sequenceNo: "10",
      sampleID: "99900066",
      analytes:"AFP",
      result: "5.3",
    },
    {
      key: "9",
      dateTime: "2022/1/31 17:12:56",
      name: "あきる台病院",
      serialNo: "12",
      sequenceNo: "1",
      sampleID: "32100099",
      analytes:"HBsAg-HQ",
      result: "0.1",
    },
    {
      key: "10",
      dateTime: "2022/1/31 14:34:11",
      name: "愛誠病院",
      serialNo: "376",
      sequenceNo: "2",
      sampleID: "00100045",
      analytes:"HBsAg-HQ",
      result: "0.1",
    },
    {
      key: "11",
      dateTime: "2022/1/30 13:43:56",
      name: "大阪医科大学付属病院",
      serialNo: "321",
      sequenceNo: "15",
      sampleID: "178100032",
      analytes:"HBsAb",
      result: "0.0",
    },
    {
      key: "12",
      dateTime: "2022/1/30 12:2:23",
      name: "聖母病院",
      serialNo: "286",
      sequenceNo: "76",
      sampleID: "22158732",
      analytes:"HBsAg",
      result: "0.1",
    },
    {
      key: "13",
      dateTime: "2022/1/30 11:55:21",
      name: "誠志会病院",
      serialNo: "342",
      sequenceNo: "933",
      sampleID: "11111132",
      analytes:"AFP",
      result: "0.0",
    },
    {
      key: "14",
      dateTime: "2022/1/30 11:11:26",
      name: "スズキ病院",
      serialNo: "377",
      sequenceNo: "123",
      sampleID: "3451323332",
      analytes:"CEA",
      result: "2.9",
    },
    {
      key: "15",
      dateTime: "2022/1/30 11:9:47",
      name: "杉並リハビリテーション病院",
      serialNo: "261",
      sequenceNo: "23",
      sampleID: "1110012032",
      analytes:"AFP",
      result: "0.1",
    },
    {
      key: "16",
      dateTime: "2022/1/30 11:1:27",
      name: "仁和会総合病院",
      serialNo: "198",
      sequenceNo: "18",
      sampleID: "125150032",
      analytes:"AFP",
      result: "0.3",
    },
  ];
  const handleTest = (keys:any)=>{
    console.log(keys.anchorKey)
    console.log(keys.currentKey)
    console.table({keys})
    console.log(keys)
  }

  const handleOpenButtonPress = (e:any) => {
    window.open("https://carisxblob.blob.core.windows.net/bot-resource/Assayevidence.pdf");
  }

  
  const handleDownloadButtonPress = (e:any) => {

 // XMLHttpRequestオブジェクトを作成する
 var xhr = new XMLHttpRequest();
 const url = "https://carisxblob.blob.core.windows.net/bot-resource/Assayevidence.pdf";
 xhr.open("GET", url, true);
 xhr.responseType = "blob"; // Blobオブジェクトとしてダウンロードする
 xhr.onload = function (oEvent:any) {
   // ダウンロード完了後の処理を定義する
   var blob = xhr.response;

   var objectURL = window.URL.createObjectURL(blob);
   // リンク（<a>要素）を生成し、JavaScriptからクリックする
   var link = document.createElement("a");
   document.body.appendChild(link);
   link.href = objectURL;
   link.download = "AssayEvidence.pdf";
   link.click();
   document.body.removeChild(link);
  };
   // XMLHttpRequestオブジェクトの通信を開始する
  xhr.send();
  }


  return(
  <>
    <Navbar isBordered variant="sticky" maxWidth={"fluid"}  >
      <Navbar.Content hideIn="xs">
        <Navbar.Item>
          <Button auto ghost onPress={handleOpenButtonPress} >
            開く
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button auto ghost onPress={handleDownloadButtonPress} >
            ダウンロード
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>

    <div  className={styles.container}>
      {/* <main className={styles.main}> */}
      <main>
        <Grid.Container
        gap={2}
        justify="center"
        alignItems="center"
        css={{ maxW:2000, marginTop:0 }}
        >
          <Text 
            h2
            css={{ textGradient: "180deg, $purple500 20%, $pink500 100%" }}
          > アッセイエビデンス</Text>
          <Grid xs={12} md={12} justify="center">

            <Table
            bordered
            aria-label="Example dynamic collection table with color selection"
            color="primary"
            
            selectionMode="multiple"
            // defaultSelectedKeys={["2"]}
            containerCss={{
                height: "auto",
                minWidth: "100%",
                backgroundColor:"$gray500"
            }}
            onSelectionChange={handleTest}
            >
              <Table.Header columns={columns}>
                  {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                  )}
              </Table.Header>
              <Table.Body items={rows}>
                  {(item) => (
                  <Table.Row key={item.key}>
                      {(columnKey) =><Table.Cell>{item[columnKey as keyof EvidenceInfo]}</Table.Cell>}
                  </Table.Row>
                  )}
              </Table.Body>
            </Table>
          </Grid>
         
        </Grid.Container>
      </main>
    </div>
    </>
  )
}




export const getStaticProps: GetStaticProps<ErrorListStaticProps> = async () => {
    console.log("Error list SSG running !!!\n");
    return {
      props: {
        dummy: "dummy",
      },
      // revalidate: 1,
    };
  }
  
  
export default ErrorList;
  