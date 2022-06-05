const { pool } = require('../utils/database');

exports.postEditadd = (req, res, next) => {
    const street = req.body.Street;
    const PostCode = req.body.PostCode;
    const City =req.body.City;
    const id= req.body.address_id;
    
    console.log(PostCode)
      console.log(id)
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE address SET Street=?,city=?,PostCode=? WHERE address_id=?`;
        
        conn.promise().query(sqlQuery, [street,City,PostCode,id])
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