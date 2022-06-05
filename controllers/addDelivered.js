const { pool } = require('../utils/database');

exports.getDelivered= (req,res,next) => {
    let Delivered;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM delivered')
        .then(([rows, fields]) => {
            Delivered = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addDelivered.ejs', {
                pageTitle: "Delivered",
                Delivered:Delivered
            })   
        })
        .catch(err => console.log(err))
    })
  
}