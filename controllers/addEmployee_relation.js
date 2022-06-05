const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let EmRel;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM employee_relationship')
        .then(([rows, fields]) => {
            EmRel = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addemployeeralation.ejs', {
                pageTitle: "Employee ralation",
                EmRel:EmRel
            })   
        })
        .catch(err => console.log(err))
    })
  
}



