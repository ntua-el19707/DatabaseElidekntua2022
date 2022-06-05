const { pool } = require('../utils/database');

exports.postEditOrga = (req, res, next) => {
    
    const organization_name = req.body.organization_name;
    const type = req.body.type;
    const address_id = req.body.address_id;
    const shortcut = req.body.shortcut;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE organization SET type_of_organization=?, address_id=?, shortcut=? WHERE name=?`;
        
        conn.promise().query(sqlQuery, [type, address_id, shortcut, organization_name])
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