const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let ResCenter;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM  researcher_center')
        .then(([rows, fields]) => {
            ResCenter = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addResCent.ejs', {
                pageTitle: "Researcher Center",
                ResCenter:ResCenter
            })   
        })
        .catch(err => console.log(err))
    })
  
}
