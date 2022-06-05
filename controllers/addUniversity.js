const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let Uni;
    let t;

       pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM  university')
        .then(([rows, fields]) => {
           Uni = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addUniversity.ejs', {
                pageTitle: "university",
                Uni:Uni
            })   
        })
        .catch(err => console.log(err))
    })
  
}
