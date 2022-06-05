const { pool } = require('../utils/database');

exports.postDeleteaddress = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    console.log(id)
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
   
        var sqlQuery = `DELETE FROM address WHERE address_id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
           res.redirect('/Organization/addaddress');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addaddress');
        })
    })

}