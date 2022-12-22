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

// const config = {
//   authentication: {
//     options: {
//       userName: "otsuka", // update me
//       password: "G1200testdbserver" // update me
//     },
//     type: "default"
//   },
//   server: "g1200testdbserver.database.windows.net", // update me
//   options: {
//     database: "G1200TestDb", //update me
//     encrypt: true
//   }
// };

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  return new Promise<void>(resolve => {
  const  queryDatabase = (connection:any, tableName:string) => {
    const content: any[] = [];
    let errorflg = false;

    console.log("Reading rows from the %s", tableName);
  
    // Read all rows from table
    const sqlStr = `SELECT * from ` + tableName;
  
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
      queryDatabase(connection,tableName);
    }
  });
  connection.connect();
}
)}


