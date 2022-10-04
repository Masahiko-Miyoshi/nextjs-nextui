import React from 'react';
import {
    Card,
    Text,
    Link,
  } from '@nextui-org/react';


type LinkCardProops = {
    url:string;
    title:string; 
    text:string;
}
  
  // リンクカード
export const LinkCard = ( props:LinkCardProops ) => {
    return (
      <>
        <Link href={props.url}>
  
          <Card isHoverable isPressable variant = "bordered" css={{ mw: "400px" }}>
            <Card.Body>
              <Text
                h3 css={{ textGradient: "45deg, $blue500 -30%, $red500 100%" }}
              >{`${props.title}`}</Text>
              <Text >{props.text}</Text>
            </Card.Body>
          </Card>
        </Link>
      </>
    )
  }