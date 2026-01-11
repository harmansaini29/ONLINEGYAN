let express = require("express");
let cors = require("cors");
let mysql2 = require("mysql2");

let app = express();
app.use(cors());
app.use(express.json());
let con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "college_portal"
});



app.listen(9000, () => { console.log("Express is Ready") });