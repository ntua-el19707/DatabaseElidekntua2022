const { pool } = require('../utils/database');
//to do fix route
exports.getView= (req,res,next) => {
    let addresses;
    
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM address')
        .then(([rows, fields]) => {
            addresses = rows;
        })
        .then(() => {
           // console.log(addresses)
            pool.releaseConnection(conn)
            res.render('adress_view.ejs', {
                pageTitle: "Adresses",
                addresses: addresses
            })   
        })
        .catch(err => console.log(err))
    })
  
}
exports.getaddress= (req,res,next) => {

    const Street= req.body.Street;
    const PostCode= req.body.PostCode;
    const City= req.body.City;
  
    /*this parmaters come fromejs in script there difined bythere id*/
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO address (PostCode,Street,City) VALUES(?,?,?)`;
        /*make the query for the add*/
        conn.promise().query(sqlQuery, [  PostCode,Street ,City])
        .then(() => {
            pool.releaseConnection(conn);
            res.redirect('/Organization/addAddress');
        })
        .catch(err => {
           res.redirect('/Organization/addAddress');
        })
        /*what ever happens stay in current page*/
    })
}

//pool.getconnection
/*Obtains a connection as Connection object. 
The callback function is defined with two arguments as (error, conn). 
The first argument is for the Error object
if an error condition occurs and the second argument is for a Connection object 
so we create a conection with db*//*
exports.getAddress = (req,res,next) => {

    let addresses;

    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM address')
        .then(([rows, fields]) => {
            addresses = rows;
        })
        .then(() => {
            console.log(addresses)
            pool.releaseConnection(conn)
            res.render('adress_view.ejs', {
                pageTitle: "Adresses Entity",
                addresses: addresses
            })   
        })
        .catch(err => console.log(err))
    })

	
}




   /*A Promise is an object representing the eventual completion or failure of an asynchronous operation.
    Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.
    */
    //callbacks added with then
    //These callbacks will be invoked even if they were added 
    //after the success or failure of the asynchronous operation that
    //the promise represents.
    //Chaining
    /*A common need is to execute two or more asynchronous operations back to back, 
    where each subsequent operation starts when the previous operation succeeds, with the result 
    from the previous step. We accomplish this by creating a promise chain.*/
    //ex const promise2 = doSomething().then(successCallback, failureCallback); kane doSomething kai epita analoga an einai 
    //success or falure
    /*Another example 
    doSomething() //kanr kati
.then(function(result) { tote molis to kaneis
  return doSomethingElse(result);
})
.then(function(newResult) { kai tote 
  return doThirdThing(newResult);
})
.then(function(finalResult) { kai totes
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);*/
//so you can Sychronises Asychronous operation sucha as multiple queries in one page
//more info down 
//Promise at querys
//The query() method takes an SQL string and an optional array of parameters that will be passed to the query.
//It returns a Promise object. The promise will be “resolved” when the query finished executing. 
//The returned rows will be the result of the promise. In case of an error, the promise will be “rejected”.
//Note that the query() method still returns immediately, before the query is executed. In order to get the results,
//we have to call the then() method of the returned promise and specify a function that will be called when the query 
//finishes executing.
//Extracting the results
/*The first problem is that in each callback function we only have access to the results of the last query.
So if we want to do something with the results of both queries, we have to store them in local variables:*/
/*Error handling
Also we can’t forget about handling errors. When any promise in the chain is rejected, and we don’t “catch” the rejection,
our program will stop with a fatal error, just like in case of an unhandled exception.*/