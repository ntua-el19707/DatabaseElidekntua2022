const { pool } = require('../utils/database');
exports.getMain= (req,res,next) => {
    let Project;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM Project')
        .then(([rows, fields]) => {
            Project = rows;
        })
        .then(() => {
           
            pool.releaseConnection(conn)
            res.render('addProject.ejs', {
                pageTitle: "Project",
                Project:Project
            })   
        })
        .catch(err => console.log(err))
    })
  
}