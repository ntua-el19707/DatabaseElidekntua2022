const { pool } = require('../utils/database.js');

exports.getMain = (req,res,next) => {

    let projects, researchers, managers;
    const manager_name = req.query.manager_name;
    const begin_date = req.query.begin_date;
    const duration = req.query.duration;

    let fetchProjectsPromise, fetchResearchersPromise;
    pool.getConnection((err, conn) => {
        
        fetchManagersPromise = new Promise((resolve, reject) => {
            conn.promise().query(`SELECT DISTINCT * FROM executive_manager`)
            .then(([rows, fields]) => {
                pool.releaseConnection(conn);
                managers = rows;
                resolve();
            })
            .catch(err => { console.log(err) })

        })

        fetchProjectsPromise = new Promise((resolve, reject) => {
            let sqlQuery = `SELECT pr.Title,pr.fundin,pr.BeginDate,pr.ExpiryDate,fp.Budget,em.name,em.Executive_manger_id From Project AS pr JOIN executive_manager AS em ON pr.managerID = em.Executive_manger_id JOIN Funding_Program AS fp ON pr.fundin = fp.name WHERE 1=1 `

            if (manager_name) sqlQuery += `AND em.Executive_manger_id=${manager_name} `;
            if (begin_date) sqlQuery += `AND pr.BeginDate='${begin_date}' `;
            if (duration) sqlQuery += `AND (YEAR(pr.ExpiryDate) - YEAR(pr.BeginDate))=${duration}`;
           
            conn.promise().query(sqlQuery)
            .then(([rows, fields]) => {
                pool.releaseConnection(conn);
                projects = rows;
                resolve();
            })
            .catch(err => { console.log(err) })
        })
            
        Promise.all([fetchProjectsPromise, fetchManagersPromise]).then(() => {
            res.render('query1.ejs', {
                pageTitle: "Show projects and fundings on multiple criteria",
                projects,
                researchers,
                managers
            })  
        })
    })
}