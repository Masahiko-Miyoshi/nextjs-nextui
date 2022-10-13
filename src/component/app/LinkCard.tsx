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
  
          <Card isHoverable isPressable variant = "bordered" css={{ mw: "800px" }}>
            <Card.Header>
            <Text
                h3 css={{ textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}
              >{`${props.title}`}</Text>
            </Card.Header>
            <Card.Body>
              <Text >{props.text}</Text>
            </Card.Body>

            <Card.Footer>
              <Text >{props.text}</Text>
            </Card.Footer>
          </Card>
        </Link>
      </>
    )
  }