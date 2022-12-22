import React from 'react';
import {
    Card,
    Text,
    Link,
  } from '@nextui-org/react';

type LinkCardWithImageProps = {
    title:string; 
    footerText?:string;
    imageUrl:string;
    url?:string;

}


export const LinkCardWithImage = (props:LinkCardWithImageProps) =>{
  const {title,footerText,imageUrl,url} = props;
  return(
      <>
      <Link href={url}>

        <Card isHoverable isPressable variant = "bordered" css={{ mw: "800px", width:"400px", height:"440px" }}>
          {/* <Card.Header>
          <Text  b size = {20} color="secondary" 
          css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}> {title} </Text>
          </Card.Header> */}
          <Card.Body css={{p:0}}>
              <Card.Image
              src={imageUrl}
              objectFit="cover"
              width="100%"
              height={380}
              // alt={title}
              
              />
          </Card.Body>

          <Card.Footer>
          <Text  b size = {20} color="secondary" 
          css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}> {title} </Text>
            {/* <Text size="12px" > {footerText} </Text> */}
          </Card.Footer>
        </Card>
      </Link>
    </>        
  )
}





