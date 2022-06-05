const { pool } = require('../utils/database');

exports.getEvaluation= (req,res,next) => {
    let Eval;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM evalulation')
        .then(([rows, fields]) => {
            Eval = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addEval.ejs', {
                pageTitle: "Eavluation",
                Eval:Eval
            })   
        })
        .catch(err => console.log(err))
    })
  
}
