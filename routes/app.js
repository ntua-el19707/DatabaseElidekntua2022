const express = require('express');
const path = require('path'); //  provides utilities for working with file and directory paths
// help https://nodejs.org/api/path.html#:~:text=The%20node%3Apath%20module%20provides,('node%3Apath')%3B
//https://www.npmjs.com/package/connect-flash
require('custom-env').env('localhost');
/*Custom env is a library built to make development more feasible by allowing multiple .env configurations 
for different environments. This is done by loading environment variables from a .env.envname file, into
the node's process.env object. https://www.npmjs.com/package/custom-env/v/1.0.2 */

const layout = require('./routes/layout')//layout is the first thing we are going to see in the server ("page main ")
const Query = require('./routes/Query')
const Orglayout = require('./routes/Organization')
const deleteOrganization = require('./routes/deleteOrganization')
const editOrganization = require('./routes/editOrganization')
const  Prlayout = require('./routes/Project')
const  Rslayout = require('./routes/Researcher')
const addOrganization = require('./routes/addOrganization')
const addphones = require('./routes/addphones')
const editphone = require('./routes/editphone')
const addfundingpr = require('./routes/addfundingpr')
const addCompany = require('./routes/addCompany')
const addUniversity = require('./routes/addUniversity')
const addResearchCent = require('./routes/addResearchCent')
const addAddress =  require('./routes/addAddress')
const deleteAddress = require('./routes/deleteaddress')
const deletephone = require('./routes/deletephone')
const editAddress = require('./routes/editaddress')
const addResearchers = require('./routes/addResearchers')
const addworkson = require('./routes/addworkson')
const addresEmp = require('./routes/addresEmp')
const addProject = require('./routes/addProject')
const addManager = require('./routes/addManager')
const editManager = require('./routes/editManager')
const deleteManager = require('./routes/deleteManager')
const addScientific = require('./routes/addScientific')
const addEval = require('./routes/addEval')
const addPrtoDeliver = require('./routes/addPrtoDeliver')
const addDelivered = require('./routes/addDelivered')
const query1 = require('./routes/query1')
const View1 = require('./routes/query2')
const View2 = require('./routes/query2view2')
//const query3 = require('./routes/query3')
const query4 = require('./routes/query4')
const query5 = require('./routes/query5')
const query6 = require('./routes/query6')
const  query7 = require('./routes/query7')
const query8 = require('./routes/query8')
/*create 8 const Query = require('./routes/query')*/
//end of routes
//we have to import them

const app = express();
//What is express ?
//Express is a minimal and flexible Node.js web 
//application framework that provides a robust 
//set of features for web and mobile applications.
//so it is frmework that we can use and edit
//without starting from 0 so we create an object 
//to call build in function of exppress to edit
//our framework in our andavadge
//meaning can use get to retrieve data from Database
//and then construct a table in javasript and print them into route or post data to route
//send variables ex:checkboxes Critiria

//usefull https://expressjs.com/en/guide/routing.html
//basiclly het get data drom  route and have req and res which
//are shortcut for request and respond so that is why use res to 
//respond to the user that we have succesfully using the Database

//app.use Steps to run the program:

app.use(express.json());
//express. json() is a built in middleware function in Express. It parses incoming JSON requests and puts the parsed data in req.
app.use(express.urlencoded({ extended: true }));
//The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.static(path.join(__dirname, 'public')));
//path.join(__dirname, 'public') will create an absolute path,
//using the directory where app.js is located as the base.
//if  instead  you use  app.use(express.static('public')) it will work unless you try to start the app from another directory
//bassicly it it takes the path of app.js and it make it static and the we try to launch app when ever app is lauched it will use app.js path
app.set('view engine', 'ejs');
app.set('views', 'views');

//template engine enables you to use static template files in your application. At runtime,
//the template engine replaces variables in a template file with actual values, and transforms
//the template into an HTML file sent to the client
// now use of routes at project
app.use('/', layout);
app.use('/Query',Query);
app.use('/Query/query1',query1)
app.use('/Query/View1',View1)
app.use('/Query/View2',View2)
//app.use('/Query/query3', query3)
app.use('/Query/query4', query4)
app.use('/Query/query5',query5)
app.use('/Query/query6',query6)
app.use('/Query/query7',query7)
app.use('/Query/query8',query8)
app.use('/Organization',Orglayout)//if  i want to add apge /organization i have to it below or else it will not waotk and a after continue ather paths
app.use('/Organization/addAddress',addAddress)
app.use('/Organization/deleteaddress',deleteAddress)
app.use('/Organization/editaddress',editAddress)
app.use('/Organization/addOrganization',addOrganization)
app.use('/Organization/delete', deleteOrganization)
app.use('/Organization/edit', editOrganization)
app.use('/Organization/addfundingpr',addfundingpr)
app.use('/Organization/addphones',addphones)
app.use('/Organization/deletephone',deletephone)
app.use('/Organization/editphone',editphone)
app.use('/Organization/addCompany',addCompany)
app.use('/Organization/addUniversity',addUniversity)
app.use('/Organization/addResearchCent',addResearchCent)
app.use('/Project',Prlayout)
app.use('/Project/addManager',addManager)
app.use('/Project/editManager',editManager)
app.use('/Project/deleteManager',deleteManager)
app.use('/Project/addScientific',addScientific)
app.use('/Project/addEval',addEval)
app.use('/Project/addPrtoDeliver',addPrtoDeliver)
app.use('/Project/addDelivered',addDelivered)
app.use('/Project/addProject',addProject)
app.use('/Researcher',Rslayout)
app.use('/Researcher/addResearchers',addResearchers)
app.use('/Researcher/addresEmp',addresEmp)
app.use('/Researcher/addworkson',addworkson)




//app.use('/Organization')
/* To do later
app.use('/qeury1', qeurey1);
app.use('/query2',qeurey2 );
.
.
.
*/
//end of routes using this project

// In case of an endpoint does not exist must return 404.html
app.use((req, res, next) => { res.status(404).render('404.ejs', { pageTitle: '404' }) })

module.exports = app ; //put inlibraty app for using
