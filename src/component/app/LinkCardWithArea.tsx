import React from 'react';
import {
    Card,
    Text,
    Link,
  } from '@nextui-org/react';
  import { Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export type AreaDataFormat ={
  Time:string;
  Value1: number;
  Value2: number;
}
 

export type AreaGraphProps = {
  dummy?:string;
  data: AreaDataFormat[];
}

  

  const AraeGraph = (props:AreaGraphProps) => {

      const {data} = props;

      return (
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" />
        <YAxis />
        <Tooltip 
        labelFormatter={function(value) {
          return `時刻: ${value}`;
        }}
        />
        <Area  name = "G1200" type="monotone" dataKey="Value1" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area name = "FR13" type="monotone" dataKey="Value2"  stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Legend height={20} />
      </AreaChart>
    );
  }
  




type LinkCardAreaGraphProps = {
    title:string; 
    footerText?:string;
    areaGraphProps:AreaGraphProps;
    
    url?:string;
}
  
  // リンクカード
export const LinkCardWithArea = ( props:LinkCardAreaGraphProps ) => {
    const {title,footerText, areaGraphProps, url} = props;
    const {data} = areaGraphProps;
    let sum = 0;

    if(data !== undefined){
      for(let i=0; i<data.length ; ++i){
        sum += (data[i].Value1+data[i].Value2);
      }
    }
    return (
      <>
        <Link href={url}>
  
          <Card isHoverable isPressable variant = "bordered" css={{ mw: "800px" }}>
            <Card.Header>
            <Text  b size = {20} color="secondary" 
            css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}> {title} </Text>

            <Text css={{px:"45px" }} h1 >
              {sum}
            </Text>

            </Card.Header>
            <Card.Body>
              <AraeGraph {...areaGraphProps} />
            </Card.Body>

            <Card.Footer>
              <Text size="12px" > {footerText} </Text>
            </Card.Footer>
          </Card>
        </Link>
      </>
    )
  }