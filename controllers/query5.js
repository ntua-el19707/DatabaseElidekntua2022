const { pool } = require('../utils/database');

exports.getMain= (req,res,next) => {
    let projects;

    pool.getConnection((err, conn) => {
        
        conn.promise().query("SELECT sf1.name,sf2.name as name2, COUNT(1) as num FROM scientific_field AS sf1 JOIN scientific_field AS sf2 ON sf1.title_pr=sf2.title_pr	WHERE sf1.name<sf2.name  GROUP BY sf1.name,sf2.name ORDER BY num DESC LIMIT 3")
        .then(([rows, fields]) => {
            projects = rows;
        })
        .then(() => {
            pool.releaseConnection(conn)
            res.render('query5.ejs', {
                pageTitle: "Top 3 frequent combination of Sc.fields ",
                projects:projects
            })   
        })
        .catch(err => console.log(err))
    })
  
}
