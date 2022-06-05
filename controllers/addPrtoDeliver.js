
const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let Project;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM project_to_delivery')
        .then(([rows, fields]) => {
            Project = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('addPrtoDeliver.ejs', {
                pageTitle: "Project to deliver",
                Project:Project
            })   
        })
        .catch(err => console.log(err))
    })
  
}