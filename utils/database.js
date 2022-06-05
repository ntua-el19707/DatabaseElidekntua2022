//To do coonect database 
const mysql = require('mysql2'); 
/* now we have to establish a conection*/ 
const pool = mysql.createPool({
	  host: "localhost",
	  port: "3306",
	  user: "root",
      password: "",
      database: "ELDIEK"
 });
 // object pooling is the procces of retaining a set of unused objects which 
 //sharefd a type
 //works: When you need a new object for your code, rather than allocating a new one
// from the system Memory Heap, you instead recycle one of the unused objects from the pool.
module.exports = {pool} ; //to kano export to library