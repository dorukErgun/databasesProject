import mysql from "mysql";

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "menteebase",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("Connected to database succesfully.");
    }else{
        console.log("Connection to database has failed.");
    }
})

export default mysqlConnection;