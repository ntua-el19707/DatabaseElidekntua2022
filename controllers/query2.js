const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let projects;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM projects_per_researcher ')
        .then(([rows, fields]) => {
            projects = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('query2.ejs', {
                pageTitle: "Projects per Researcher",
                projects:projects
            })   
        })
        .catch(err => console.log(err))
    })
  
}
