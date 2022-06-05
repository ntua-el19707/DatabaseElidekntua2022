const { pool } = require('../utils/database');

exports.postEditMang = (req, res, next) => {
    
    const name = req.body.name;
    const id = req.body.id;
    console.log(name,id)
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE executive_manager SET name=? WHERE Executive_manger_id=?`;
        
        conn.promise().query(sqlQuery, [name,id])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Project/addManager');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Project/addManager');
        })
    })

}