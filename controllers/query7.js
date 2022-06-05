const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let answer;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM TOP5')
        .then(([rows, fields]) => {
            answer = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('query7.ejs', {
                pageTitle: "Top 5 Managers ",
                answer:answer
            })   
        })
        .catch(err => console.log(err))
    })
  
}