exports.getMain = (req,res,next) => {

           res.render('query8.ejs', {
                pageTitle: "whatever" })
}
const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let answer;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM query8')
        .then(([rows, fields]) => {
            answer = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('query8.ejs', {
                pageTitle: "Researchers with no deliverys ",
                answer:answer
            })   
        })
        .catch(err => console.log(err))
    })
  
}