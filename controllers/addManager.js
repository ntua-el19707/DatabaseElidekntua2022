const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let manager;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM executive_manager')
        .then(([rows, fields]) => {
            manager = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addManager.ejs', {
                pageTitle: "Executive Mangers",
                manager:manager
            })   
        })
        .catch(err => console.log(err))
    })
  
}
exports.addManager = (req, res, next) => {

    const name= req.body.name;


    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO executive_manager(name) VALUES(?)`;

        conn.promise().query(sqlQuery, [name])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Project/addManager');
        })
        .catch(err => {
           res.redirect('/Project/addManager');
        })
    })
}