const { pool } = require('../utils/database');

exports.getMain = (req,res,next) => {
            res.render('Querys.ejs', {
                pageTitle: "Query Page" })
}