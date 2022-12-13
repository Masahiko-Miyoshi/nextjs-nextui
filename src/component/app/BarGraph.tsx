import React from "react";
import moment from 'moment';
import { Brush, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";


export type AnyJson = { [prop: string]: any };
export type LabelFormat = {
   key: string;
   color: string;
};
  
type BarGraphProps = {
    title: string;
    dataKey:string;
    oxLabel:string;
    oyLabel:string;
    values:AnyJson[];
    yLimit:number[];
    labels:LabelFormat[];
  };

  const BarGraph = (props:BarGraphProps) => {
    const {title ,dataKey,oxLabel,oyLabel,values,yLimit,labels} = {...props};
  
    return (
      <div>
        <h3>{title}</h3>
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
          startIndex={values.length-20}
          endIndex={values.length-1}
          height={50}
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
  
  export default BarGraph;
  