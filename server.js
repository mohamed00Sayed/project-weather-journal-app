// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 5000;
const server = app.listen(port, serverCallBack);
// the callBack function for the server
function serverCallBack(){
	console.log(`the server is running on port ${port}`);
}


// a get route for all data in the program endpoint
app.get('/data', returnData);

function returnData(req, res){
	res.send(projectData);
	console.log('above data sent...');
}

//a post route with the new data to add to the program endpoint
app.post('/addData', addData);
let key = 0 ;
function addData(req, res){
	const obj = {
		temp:req.body.temp, 
		date:req.body.date, 
		UserResp:req.body.UserResp
		};
	const name = 'obj'+key;
	
	projectData[name] = obj;
	key++;
	console.log('data added...' , obj);
}

//a get route for the last entered data by the userAgent
app.get('/last', retrieveLast);

function retrieveLast(req, res){
	if(Object.keys(projectData).length > 0){
		const oldKey = key - 1;
		const name = 'obj'+oldKey;
		const obj = projectData[name];
		res.send(obj);
	}
}
