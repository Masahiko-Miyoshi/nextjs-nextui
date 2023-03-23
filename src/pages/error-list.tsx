import React, { Key, useState } from 'react'
import type { NextPage,GetStaticProps } from 'next'
import {Link,Button,Navbar,Text,Grid,Table,Input} from '@nextui-org/react';
import Router from "next/router";

import confetti from 'canvas-confetti';
import { DlgConfirm } from '../component/common/DlgConfirm';

type ErrorListStaticProps = {
    dummy:string,
}

type ErrorInfo = {
  key: string,
  dateTime: string,
  name: string,
  serialNo: string,
  errorContent: string,

}


export const ErrorList:NextPage<ErrorListStaticProps> = (props)=>{


  const columns = [
    {
      key: "dateTime",
      label: "日時",
    },
    {
      key: "name",
      label: "施設名",
    },
    {
      key: "serialNo",
      label: "シリアル番号",
    },
    {
      key: "errorContent",
      label: "エラー内容",
    },
  ];

  const  defaultRows: ErrorInfo[] = [
    {
      key: "1",
      dateTime: "2022/02/03 9:32:34",
      name: "大阪府済生会泉尾病院",
      serialNo: "321",
      errorContent: "検体分注アームがスリップしました",
    },
    {
      key: "2",
      dateTime: "2022/02/01 17:1:23",
      name: "大阪赤十字病院",
      serialNo: "12",
      errorContent: "光学系がエラーです",
    },

    {
      key: "3",
      dateTime: "2022/02/03 11:12:34",
      name: "近畿大学病院",
      serialNo: "211",
      errorContent: "試薬分注ノズルがスリップしました。",
    },
   
    {
      key: "4",
      dateTime: "2022/02/01 12:12:34",
      name: "旭川医療センター",
      serialNo: "654",
      errorContent: "検体吸引エラーです",
    },
    {
      key: "5",
      dateTime: "2022/02/01 10:23:1",
      name: "旭川医療センター",
      serialNo: "654",
      errorContent: "検体吸引エラーです",
    },
    {
      key: "6",
      dateTime: "2022/02/01 10:10:33",
      name: "旭川医療センター",
      serialNo: "654",
      errorContent: "検体吸引エラーです",
    },
    {
      key: "7",
      dateTime: "2022/02/01 9:12:23",
      name: "板橋区医師会病院",
      serialNo: "196",
      errorContent: "試薬吸引エラーです",
    },
    {
      key: "8",
      dateTime: "2022/02/01 9:4:1",
      name: "池上総合病院",
      serialNo: "452",
      errorContent: "検量線の作成に失敗しました",
    },
    {
      key: "9",
      dateTime: "2022/01/31 17:12:56",
      name: "あきる台病院",
      serialNo: "12",
      errorContent: "検体吸引エラーです",
    },
    {
      key: "10",
      dateTime: "2022/01/31 14:34:11",
      name: "愛誠病院",
      serialNo: "376",
      errorContent: "ラックIDの読み取りに失敗しました",
    },
    {
      key: "11",
      dateTime: "2022/01/30 13:43:56",
      name: "大阪医科大学付属病院",
      serialNo: "321",
      errorContent: "検体吸引エラーです",
    },
    {
      key: "12",
      dateTime: "2022/01/30 12:2:23",
      name: "聖母病院",
      serialNo: "286",
      errorContent: "洗浄不良が発生しました",
    },
    {
      key: "13",
      dateTime: "2022/01/30 11:55:21",
      name: "誠志会病院",
      serialNo: "342",
      errorContent: "試薬分注アームがスリップしました",
    },
    {
      key: "14",
      dateTime: "2022/01/30 11:11:26",
      name: "スズキ病院",
      serialNo: "377",
      errorContent: "ラックフィーダーがタイムアウトしました",
    },
    {
      key: "15",
      dateTime: "2022/01/30 11:9:47",
      name: "杉並リハビリテーション病院",
      serialNo: "261",
      errorContent: "セルフチェックに失敗しました",
    },
    {
      key: "16",
      dateTime: "2022/01/30 11:1:27",
      name: "仁和会総合病院",
      serialNo: "198",
      errorContent: "反応テーブルの温度が異常です",
    },
  ];
  const handleTest = (keys:any)=>{
    console.log(keys.anchorKey)
    console.log(keys.currentKey)
    console.table({keys})
    console.log(keys)
  }

  const handleVisitButton = (e:any) =>{
    setShowDlgConfirm(true);
  }

const handleDlgConfirmButton1Press = ()=>{
  confetti();
  Router.push("error-map?request=visit&hospitalName=近畿大学病院&lon=135.54971742309684&lat=34.47726559373711");
}


const handleDlgConfirmButton2Press = ()=>{
  setShowDlgConfirm(false);
}


const handleDateTime = (e:any)  =>{

  const filterRows  = defaultRows.filter((record)=>{

    const convertDate = e.target.value.replace(/-/g,'/')
    if(record.dateTime.includes(convertDate)){
      return true;
    }
  });
  setRows(filterRows);
}

const handleHospitalName = (e:any)  =>{
  
   const filterRows  = defaultRows.filter((record)=>{
    if(record.name.includes(e.target.value)){
      return true;
    }
  });
  setRows(filterRows);
}

  const [showDlgConfirm,setShowDlgConfirm] = React.useState(false);
  const [dataTimeStrig, setDateTimeString] = React.useState("");
  const [rows, setRows] = React.useState(defaultRows);

  const today = formatDate(new Date());
  return(
  <>
    <Navbar isBordered variant="sticky" maxWidth={"fluid"}  >
      <Navbar.Content hideIn="xs">
        <Navbar.Item>
          <Button auto ghost >
            開く
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button auto ghost  >
            ダウンロード
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button auto ghost onPress={handleVisitButton} >
            訪問
          </Button>
        </Navbar.Item>
        </Navbar.Content>

        <Navbar.Content hideIn="xs">
        <Navbar.Item  css={{display:"flex"}} >
        
        <Input 
          label="病院"
          underlined
          placeholder="絞り込み" color="primary"
          onChange={handleHospitalName}
         />
        
        </Navbar.Item>
        <Navbar.Item  >
        
        <Input 
          label="日時"
          underlined
          color="primary"
          // width="300px" 
          type="date" 
          onChange={handleDateTime}
          // value={today}
          
        />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>

    <div >
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
          > エラーリスト</Text>
          <Grid xs={12} md={12} justify="center">

            <Table
            bordered
            aria-label="Example dynamic collection table with color selection"
            color="primary"
            striped                                                                                                                                                                                                                                                                
            selectionMode="single"
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
                      {(columnKey) =><Table.Cell>{item[columnKey as keyof ErrorInfo]}</Table.Cell>}
                  </Table.Row>
                  )}
              </Table.Body>
            </Table>
          </Grid>
          <DlgConfirm show={showDlgConfirm}
          title="確認" contentMessage="この病院にデジタル訪問しますか？" 
          button1Label="はい" button2Label="いいえ"
          handleButton1Press={handleDlgConfirmButton1Press} 
          handleButton2Press={handleDlgConfirmButton2Press} />
        </Grid.Container>
      </main>
    </div>
    </>
  )
}


const formatDate = (dt:Date) => {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
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
  