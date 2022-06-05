//const { pool } = require('../utils/database');

exports.getMain = (req,res,next) => {
/*
    let addresses;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM address')
        .then(([rows, fields]) => {
            addresses = rows;
        })
        .then(() => {
            console.log(addresses)
            pool.releaseConnection(conn)
            res.render('adress_view.ejs', {
                pageTitle: "Main Page",
                addresses: addresses
            })   
        })
        .catch(err => console.log(err))
    })*/

	 res.render('main_page.ejs', {
                pageTitle: "Main Page",
               // addresses: addresses
            })   
}