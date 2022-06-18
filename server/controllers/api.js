import mysqlConnection from "../connection.js"

// getting all posts
const getProducts = async (req, res) => {
    mysqlConnection.query("SELECT * FROM `program`", (err, rows, fields) => {
        if(err){
            console.log(err);
            return;
        }
        res.send(rows);
    })
};

export default { getProducts };