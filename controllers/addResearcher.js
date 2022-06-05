
const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let Res;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM  researcher')
        .then(([rows, fields]) => {
            Res = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addresearcher.ejs', {
                pageTitle: "Researcher",
                Res:Res
            })   
        })
        .catch(err => console.log(err))
    })
  
}
