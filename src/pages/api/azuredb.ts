import type { NextApiRequest, NextApiResponse } from 'next'
export {}; //need export{} in order to escape typescript error 
          //here => {Request } = require("tedious");
const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: process.env.AZURE_DB_USER_NAME, // update me
      password: process.env.AZURE_DB_PASSWORD // update me
    },
    type: "default"
  },
  server: process.env.AZURE_DB_SERVER, // update me
  options: {
    database: process.env.AZURE_DB_NAME, //update me
    encrypt: true
  }
};



/*
接続するリソースはテーブル、もしくはストアドプロシージャのどちらかを指定する。
テーブルの場合は、tableNameにテーブル名を指定する。
ストアドプロシージャの場合は、procedureNameにストアドプロシージャ名を指定する。
filterBy？には、テーブルの場合はWHERE句、ストアドプロシージャの場合は引数を指定する。
テーブルの場合： select * from tableName where vendor_group = filterByVendor
ストアドプロシージャの場合： EXEC procedureName @vendor_group = filterByVendor
*/
interface queryDatabaseProps {
  connection:any;
  tableName?:string;
  procedureName?:string;
  filterByVendor?:string;
  filterByCustomer?:string;
  filterBySerialNo?:string;
  filterByModelId?:string;
}

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  return new Promise<void>(resolve => {
  // const  queryDatabase = (connection:any, tableName?:string, procedureName?:string, filter?:string) => {
    const  queryDatabase = (props:queryDatabaseProps) => {
    const {connection, tableName, procedureName,filterByVendor,filterByCustomer,filterBySerialNo,filterByModelId} = props;
    const content: any[] = [];
    let errorflg = false;
    let sqlStr = '';

    let conditions = [];
    if(tableName !== undefined){
      if(filterByVendor !== undefined && filterByVendor !== ''){
          conditions.push(`vendor_group=${filterByVendor}`);
      }
      if(filterByCustomer !== undefined && filterByCustomer !== ''){
          conditions.push(`customer_group=${filterByCustomer}`);
      }
      if(filterBySerialNo !== undefined && filterBySerialNo !== ''){
          conditions.push(`machine_serial_no=${filterBySerialNo}`);
      }
      if(filterByModelId !== undefined && filterByModelId !== ''){
          conditions.push(`model_id=${filterByModelId}`);
      }
      let filter = conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
      sqlStr = `SELECT * from ${tableName}${filter}`;
      console.log(sqlStr);
      
     
    }
    else if(procedureName !== undefined){
      if(filterByVendor !== undefined && filterByVendor !== ''){
        conditions.push(`@vendor_group=${filterByVendor}`);
      }
      if(filterByCustomer !== undefined && filterByCustomer !== ''){
          conditions.push(`@customer_group=${filterByCustomer}`);
      }
      if(filterBySerialNo !== undefined && filterBySerialNo !== ''){
          conditions.push(`@machine_serial_no=${filterBySerialNo}`);
      }
      if(filterByModelId !== undefined && filterByModelId !== ''){
          conditions.push(`@model_id=${filterByModelId}`);
      }
      let filter = conditions.length ? ` ${conditions.join(', ')}` : '';
      sqlStr = `EXEC ${procedureName}${filter}`;
      console.log(sqlStr);
    }
    else{
      console.log("Reading rows from the %s", 'undefined SQL !');
    }
    const request = new Request(
      sqlStr,
      (err:any, rowCount:number) => {
        if (err) {
          errorflg = true;
          console.error(err.message);
          res.status(500).send('sql query error');
          return resolve();
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
  
  
    request.on("row", (columns:any) => {
      let result:any = {};
      columns.forEach((column:any) => {
        result[column.metadata.colName] = column.value === null ? '' : column.value;
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
      content.push(result);
      result = {};
    });
  
  
    connection.on('end', function () {
      console.log("Time: %s",new Date().toTimeString())
      if(!errorflg)
        res.status(200).json(content);
        return resolve();
    });
      
      // Close the connection after the final event emitted by the request, after the callback passes
      request.on("requestCompleted", function (rowCount:number, more:any) {
          connection.close();
      });
    connection.execSql(request);
 
  }

  const connection = new Connection(config);
  // Attempt to connect and execute queries if connection goes through
  connection.on("connect", (err:any) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('sql connection error');
      return resolve();
    
    } else {
      const tableName:string =  req.query.table as string; 
      const procedureName:string =  req.query.procedure as string; 
      const filterByCustomer:string =  req.query.customer_group as string; 
      const filterByVendor:string =  req.query.vendor_group as string;
      const filterBySerialNo:string =  req.query.mmachine_serial_no as string;
      const filterByModelId:string =  req.query.model_id as string;

      queryDatabase({connection,tableName,procedureName,filterByCustomer,filterByVendor,filterBySerialNo,filterByModelId});
    }
  });
  connection.connect();
}
)}


