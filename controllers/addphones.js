const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let organization,phones;
    
    pool.getConnection((err, conn) => {
        
        let fetchAddressesPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM phones')
            .then(([rows, fields]) => {
                phones = rows;
            })
            .then(() => {
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        let fetchAllPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM organization')
            .then(([rows, fields]) => {
                organization = rows;
            })
            .then(() => {
               // console.log(organization)
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        Promise.all([fetchAllPromise, fetchAddressesPromise]).then(() => {
            res.render('addphones.ejs', {
                pageTitle: "Organization",
                phones:phones,
                organization:organization
            })  
        })
    })
  
}
exports.addphone = (req, res, next) => {

    const organization_name = req.body.organame;
    const phone = req.body.new_phone;
    
 
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO phones VALUES(?, ?,)`;

        conn.promise().query(sqlQuery, [organization_name, phone])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addphones');
        })
        .catch(err => {
            res.redirect('/Organization/addphones');
        })
    })
}