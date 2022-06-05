const { pool } = require('../utils/database');

exports.postDeleteOrga = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM organization WHERE name ='${id}''`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addOrganization');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/Organization/addOrganization');
        })
    })

}