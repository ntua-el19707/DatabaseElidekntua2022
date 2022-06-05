const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let organiza, addresses;
    
    pool.getConnection((err, conn) => {
        
        let fetchAddressesPromise = new Promise((resolve, reject) => {
            conn.promise().query('SELECT * FROM address')
            .then(([rows, fields]) => {
                addresses = rows;
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
                organiza = rows;
            })
            .then(() => {
                pool.releaseConnection(conn)
                resolve(); 
            })
            .catch(err => console.log(err))
        })

        Promise.all([fetchAllPromise, fetchAddressesPromise]).then(() => {
            res.render('addOrganization.ejs', {
                pageTitle: "Organization",
                addresses,
                organiza:organiza
            })  
        })
    })
  
}

exports.addOrg = (req, res, next) => {

    const organization_name = req.body.organization_name;
    const type = req.body.type;
    const address_id = req.body.address_id;
    const shortcut = req.body.shortcut;

    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO organization(name, type_of_organization, address_id, shortcut) VALUES(?, ?, ?, ?)`;

        conn.promise().query(sqlQuery, [organization_name, type, address_id, shortcut])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addOrganization');
        })
        .catch(err => {
            res.redirect('/Organization/addOrganization');
        })
    })
}