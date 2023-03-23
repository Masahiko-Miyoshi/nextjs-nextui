import React from 'react' 
import { Card, Text } from "@nextui-org/react";


type PopupLabelProps = {
    show:boolean;
    message?:string;
    top?: number;
    left?: number;
    onPress?: (e:any)=>void;

}

export const PopupLabel = (props:PopupLabelProps) =>{
    const {show,message,top,left,onPress} = props;
    console.log(top,left);
    if(!show) return null;
    return(
        <Card css={{ mw: "330px" ,top:top, left:left }} isHoverable isPressable onPress={onPress} >
        {/* <Card isHoverable variant="bordered" css={{ mw: "400px" }}> */}
        <Card.Body>
            <Text>{message}</Text>
        </Card.Body>
        </Card>
      
    )
}
