//MYSQL CRED
const mySql = require('mysql2');

//sql connection targeting database want use from establish connection
const db = mySql.createConnection({
    //mysql port
    port: 3306, 
    user: "root",
    password: "password",
    database: "company_db",
    host: "localhost"
})
//alerts if error
db.connect(function(err){
    if (err) throw err
})

module.exports = db