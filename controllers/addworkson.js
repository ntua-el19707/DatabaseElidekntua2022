const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let work;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM  work_on')
        .then(([rows, fields]) => {
           work = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addworkson.ejs', {
                pageTitle: "Works on",
                work:work
            })   
        })
        .catch(err => console.log(err))
    })
  
}