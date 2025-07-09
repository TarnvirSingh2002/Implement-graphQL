import mysql from "mysql2";

const database=mysql.createConnection({
    host:"localhost",
    database:"demo",
    user:"root",
    password:"Tarn",
    port: 3306,
});

database.connect((error)=>{
    if(error){
        console.log(error);
        console.log("not connected");
    }
    else{
        console.log("Connected");
    }
})
export default database;