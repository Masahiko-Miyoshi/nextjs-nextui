import React from "react";
import { Row, Button, Text, Spacer, Modal } from "@nextui-org/react";
import confetti from 'canvas-confetti';



type Props = {
  show: boolean;
  title: string;
  contentMessage: string;
  button1Label:string;
  button2Label:string;
  handleButton1Press?: ()=>void
  handleButton2Press?: ()=>void
}


export const DlgConfirm = (props:Props) =>  {
    const {show, handleButton1Press,handleButton2Press,title,contentMessage,button1Label,button2Label} = props;
    
    return (
    <Modal open={show} css={{ mw: "600px",mx:"auto",mt:"150px",backgroundColor:"$gray200"}} >
        <Modal.Header css={{backgroundColor:"#000000"}}>
          <Text css={{ textGradient: "45deg, $blue500 -30%, $red500 100%" }} size={20} weight="bold">{title}</Text>
        </Modal.Header>
       
        <Spacer y={1.6} />
        <Modal.Body  css={{ py: "$10" , fontSize:"20px" }}>
            {contentMessage}
        </Modal.Body>
        
        <Modal.Footer>
        
          <Row justify="flex-end">
          <Button auto ghost onPress={handleButton1Press}>
          {button1Label}
          </Button>

          <Button auto ghost onPress={handleButton2Press}>
          {button2Label}
          </Button>
            
          </Row>
        </Modal.Footer>
    </Modal>
  );
}



