const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let answer;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM query6 ')
        .then(([rows, fields]) => {
            answer = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('Query6.ejs', {
                pageTitle: "Top Workers under 40 ",
                answer:answer
            })   
        })
        .catch(err => console.log(err))
    })
  
}
