import React from 'react';
import {

    Card,
    Text,
    Link,
  } from '@nextui-org/react';
  import { Legend,Pie, Cell, PieChart, Tooltip } from 'recharts';



type PieDataFormat ={
  name:string;
  value: number;
}
 
type PieType = "pie"|"donuts";

export type PieGraphProps = {
  data: PieDataFormat[];
  pieType:PieType;
}


const COLORS = ["#905E96", "#D58BDD", "#FF99D7", "#FFD372","#FF731D"];

const RADIAN = Math.PI / 180;

let G_pieType:PieType;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const param = (G_pieType==="donuts")?0.35:0.55;
  const radius =  innerRadius + (outerRadius - innerRadius) * param;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (

    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const PieGraph = (props:PieGraphProps) => {

    const {data,pieType} = props;

    console.log("pieType "+pieType);
    G_pieType = pieType;
    return (
      
        <PieChart width={500} height={350}>
          <Pie
            data={data}
            cx={250}
            cy={150}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={(pieType==="donuts")?60:0}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value as number)} />
          <Legend />
        </PieChart>
      );
}
  




type LinkCardPieGraphProps = {
    title:string; 
    footerText?:string;
    pieGraphProps:PieGraphProps;
    
    url?:string;
}
  
  // リンクカード
export const LinkCardWithPie = ( props:LinkCardPieGraphProps ) => {
    const {title,footerText, pieGraphProps, url} = props;
    return (
      <>
        <Link href={url}>
  
          <Card isHoverable isPressable variant = "bordered" css={{ mw: "800px" }}>
            <Card.Header>
            <Text  b size = {20} color="secondary" 
            css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}> {title} </Text>

            </Card.Header>
            <Card.Body>
              <PieGraph {...pieGraphProps} />
            </Card.Body>

            <Card.Footer>
              <Text size="12px" > {footerText} </Text>
            </Card.Footer>
          </Card>
        </Link>
      </>
    )
  }