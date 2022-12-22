import React from 'react';
import { Switch, Card, Text, Link, } from '@nextui-org/react';
import moment from 'moment';
import { Brush, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";


export type AnyJson = { [prop: string]: any };
export type LabelFormat = {
   key: string;
   color: string;
};
  
export type BarGraphProps = {
    dataKey:string;
    oxLabel:string;
    oyLabel:string;
    values:AnyJson[];
    yLimit:number[];
    labels:LabelFormat[];
  };

  export const BarGraph = (props:BarGraphProps) => {
    const {dataKey,oxLabel,oyLabel,values,yLimit,labels} = {...props};
    
    return (
      <div>
        
        
        <BarChart
          width={1200}
          height={300}
          data={values}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
         
        >
          <XAxis dataKey={dataKey} angle={-5}  tick={{fontSize: 5}}
           tickFormatter={(t) => moment(t).format("YY/MM/DD")}
          >
            <Label value={oxLabel} position="insideBottomRight" dy={10} dx={20} fill="gray" />
          </XAxis>
          <YAxis type="number" domain={yLimit}>
            <Label
              value={oyLabel}
              position="left"
              angle={-90}
              dy={-20}
              dx={-10}
              fill="gray"
            />
          </YAxis>
          <Tooltip />
          <Legend
            // onClick={selectBar}
            // onMouseOver={handleLegendMouseEnter}
            // onMouseOut={handleLegendMouseLeave}
          />
          <Brush
          dataKey={dataKey}
          stroke="#8884d8"
          startIndex={values.length-20>0?values.length-20:1}
          endIndex={values.length-1}
          height={30}
          />
          {labels.map((label, index) => (
            <Bar
              key={index}
              dataKey={label.key}
              fill={label.color}
              stackId={dataKey}
            />
          ))}
        </BarChart>
      </div>
    );
  };
  
type LinkCardBarGraphProops = {
    title:string; 
    footerText?:string;
    barGraphProps:BarGraphProps;
    setUpdateGraph: (updateGraph:boolean)=>void
}
  
  // リンクカード
export const LinkCardWithBar = ( props:LinkCardBarGraphProops ) => {
    const {title,footerText, barGraphProps,} = props;
    const [updateGraph,setUpdateGraph] = React.useState(false);
    

    const funcSwitchChanged = (e:any) =>{
        setUpdateGraph(e.target.checked ? true : false);
        props.setUpdateGraph(e.target.checked ? true : false);
    }
    return (
  
          <Card isHoverable  variant = "bordered" css={{ mw: "1400px"}}>
            <Card.Header>
            <Text  b size = {20} color="secondary" 
            css={{textGradient: "45deg, $blue500 -0%, $yellow500 100%" }}> {title} </Text>

            <Switch shadow color="error"
                checked={updateGraph}
                onChange={funcSwitchChanged}
                css ={{paddingLeft:"20px"}}
            />   

            </Card.Header>
            <Card.Body>
              <BarGraph {...barGraphProps} />
            </Card.Body>

            <Card.Footer>
              <Text size="12px" > {footerText} </Text>
            </Card.Footer>
          </Card>
    )
  }
  