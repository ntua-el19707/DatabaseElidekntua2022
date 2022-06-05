

const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let Scien;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM  scientific_field')
        .then(([rows, fields]) => {
           Scien = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addScientific.ejs', {
                pageTitle: "Scientific field",
                Scien:Scien
            })   
        })
        .catch(err => console.log(err))
    })
  
}
