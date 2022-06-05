const { pool } = require('../utils/database')

exports.getMain = (req,res,next) => {
    
    const field = req.query.field;
    let field_options, result;

    pool.getConnection((err, conn) => {
        let fieldsPromise = new Promise((resolve, reject) => {
            let sqlQuery = `SELECT DISTINCT name FROM scientific_field`;
        
            conn.promise().query(sqlQuery)
            .then(([rows, fields]) => {
                field_options = rows;
                resolve();
            })
            .catch(err => { console.log(err) })
        })

        let resultPromise = new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM scientific_field `;
            if (field) sqlQuery += `WHERE name = '${field}'`;
        
            conn.promise().query(sqlQuery)
            .then(([rows, fields]) => {
                result = rows;
                resolve();
            })
            .catch(err => { console.log(err) })
        })

        Promise.all([fieldsPromise, resultPromise]).then(() => {
            
            res.render('query3.ejs', {
                pageTitle: "Organization with the same number of works 2 Years",
                result,
                field_options
            })
        });
    })

}
