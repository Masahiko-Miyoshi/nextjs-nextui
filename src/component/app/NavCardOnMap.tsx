import React from 'react';
import {Card,Text,Button,Spacer,} from '@nextui-org/react';
import { useRouter } from 'next/router';
import confetti from 'canvas-confetti';


type NavCardOnMapProps = {
    title:string; 
    footerText?:string;
    imageUrl:string;
    onClose: (e: any)=>void;
}




export const NavCardOnMap = (props:NavCardOnMapProps) =>{
  const {title,footerText,imageUrl,onClose} = props;

  const router = useRouter();
  const handleRemoteButton = () => {
    confetti();
    // window.open("https://start.teamviewer.com/device/1296315314/authorization/password/mode/control", "_blank");
    window.open("https://start.teamviewer.com", "_blank");
  }
  
  
  const handleChatBotButton = () => {
    // console.log("AAAAAA");
    confetti()
    router.push("/chat-bot");
  }
  
  

  return(
      <>
        <Card variant = "bordered" css={{ tm: "0px", mw: "800px", width:"400px", height:"100%", zIndex:1 }}>
          <Card.Header>
            {/* <Text  b size = {20} color="secondary" 
            css={{color:"white"}}> {title}</Text> */}
             {/* <Spacer y={1} /> */}
            <Text  b size = {20} color="secondary" 
            css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}>{title}</Text>
            
          <Spacer y={1} />
          <Button onPress = {onClose} color="error" auto ghost 
          css={{marginLeft:'auto' }}
          > 閉じる</Button>
          </Card.Header>
          <Card.Body css={{p:0}}>
            <Card.Image
            src={imageUrl}
            objectFit="cover"
            width="100%"
            height="80%"
            // alt={title}
            ></Card.Image>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost onClick={handleChatBotButton}> 現在発生しているエラー原因と対処方法 </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost onClick={handleRemoteButton} > リモート操作と通話 </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost> 各種ログのダウンロード </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost> プロセスモニター </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost> 外部QC </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost> 測定結果 </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost> 試薬消費量（予測） </Button>
            <Spacer y={0.5} />
            <Button color="warning" auto ghost> 過去の故障状況 </Button>
          </Card.Body>

          <Card.Footer>
          <Text  b size = {20} color="secondary" 
          css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}>  </Text>
            <Text size="12px" > {footerText} </Text>
          </Card.Footer>
        </Card>
    </>
  )
}





