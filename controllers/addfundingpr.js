const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let funding_program;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM funding_program')
        .then(([rows, fields]) => {
            funding_program = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addfundin.ejs', {
                pageTitle: "Funding Programs",
                funding_program:funding_program
            })   
        })
        .catch(err => console.log(err))
    })
  
}


