const { pool } = require('../utils/database')

exports.getMain = (req,res,next) => {
    res.render('Organization_menu.ejs', {
        pageTitle: "Organization_Menu" 
    })  
}

exports.OrgResearchers = (req, res, next) => {
    let id = req.params.id;

    let sqlQuery = `SELECT DISTINCT r.Researher_id,r.name,r.Surname,p.Title FROM researcher AS r JOIN work_on AS wr ON wr.worker_id = r.Researher_id JOIN project AS p ON wr.project_title = p.Title WHERE p.Title='${id}';`;
    
    pool.getConnection((err, conn) => {
        conn.promise().query(sqlQuery)
        .then(([rows, fields]) => {
            pool.releaseConnection(conn);
            console.log(rows)
            res.render('OrgResearchers.ejs', {
                pageTitle: `Researchers Work on ${id}`,
                projectTitle: id,
                Res: rows
            })  
        })
        .catch(err => { console.log(err) })

    })
        

}  
