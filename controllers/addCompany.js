const { pool } = require('../utils/database');

exports.getCompany= (req,res,next) => {
    let Company;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM Company')
        .then(([rows, fields]) => {
            Company = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addCompany.ejs', {
                pageTitle: "Companys",
                Company: Company
            })   
        })
        .catch(err => console.log(err))
    })
  
}



