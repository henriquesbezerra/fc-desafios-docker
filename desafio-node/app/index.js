import express from "express";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;
const config = { 
  host: 'db',
  user: 'admin',
  password: 'adminpass',
  database: 'nodedb'
};

const connection = await mysql.createConnection(config);

try {

  // Create Table
  await connection.query(`create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id))`);
  
  const [results, fields] = await connection.query(`INSERT INTO people(name) values('Henrique')`);

  console.log({
    results,
    fields
  });

} catch (error) {
  throw error;
}


app.get('/', async (req, res) => {
  
  const [results, fields] = await connection.query(`SELECT * from people`);

  console.log(results);
  
  let htmlResult = `
    <h1>Full Cycle Rocks!!</h1>
    <ul>  
  `;

  results.forEach( r => htmlResult+=`<li>${r.name}</li>`);

  htmlResult+='</ul>';

  res.send(htmlResult);
});

app.listen(port, ()=>{
  console.log(`Server running at: ${port}`);
});

