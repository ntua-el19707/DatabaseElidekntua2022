const { pool } = require('../utils/database');

exports.postDeleteMang = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
   
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
   
        var sqlQuery = `DELETE FROM executive_manager WHERE Executive_manger_id = ${id}`;

        conn.promise().query(sqlQuery)
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