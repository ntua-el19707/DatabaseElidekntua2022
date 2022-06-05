const { pool } = require('../utils/database');

exports.postEditphone = (req, res, next) => {
    
    
    const phone = req.body.phone;
    const oldphone = req.body.oldphone;
    console.log(oldphone)
    console.log(phone)
  
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE phones SET  phone=? WHERE phone=?`;
        
        conn.promise().query(sqlQuery, [phone,oldphone])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addphones');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addphones');
        })
    })

}