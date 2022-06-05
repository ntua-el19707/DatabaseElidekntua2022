const { pool } = require('../utils/database');

exports.postDeletephone = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM phones WHERE phone ='${id}'`;

        conn.promise().query(sqlQuery)
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