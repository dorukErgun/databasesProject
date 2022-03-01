import mysqlConnection from "../connection.js"

// getting all posts
const getPeople = async (req, res) => {
    mysqlConnection.query("SELECT * FROM `testtable`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }

        console.log(rows);
        res.send(rows);
    })
};

export default { getPeople };