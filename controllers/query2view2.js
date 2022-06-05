const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let projects;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM active_projects')
        .then(([rows, fields]) => {
            projects = rows;
        })
        .then(() => {
        console.log(projects)
            pool.releaseConnection(conn)
            res.render('query2view2.ejs', {
                pageTitle: "Active Projects",
                projects:projects
            })   
        })
        .catch(err => console.log(err))
    })
  
}
