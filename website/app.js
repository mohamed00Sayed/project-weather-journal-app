/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/* function to get data /* template test*/
/* should fetch data from our server.
*/
function initializer(){
	document.addEventListener('DOMContentLoaded', function(){
		document.querySelector('#generate').addEventListener('click', actionOnClick);
	});
}

initializer();


function getData(){
	const getData = async (url='')=>{
		const res = await fetch(url);
		try{
			const newData = await res.json();
			console.log(newData);
			return newData;
		}catch(err){
			console.log('error: ', err);
		}
	}
	return getData;
}

/* a function to add data /* template test*/
/* should add data to our server side */
function addData(){
	const addData = async (url='', data={})=>{
		const res = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		try{
			const newData = await res.json();
			console.log(newData);
			return newData;
		}catch(err){
			console.log('error: ', err);
		}
	}
	return addData;
}

/* chain both methods  /* template test*/
/* here we should get data from weather apis then post italics
* to our server and save it after that we should update our UI
*/

function actionOnClick(){
	const getzData = getData();
	const addzData = addData();
	const zip = document.querySelector('#zip').value;
	const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
						+zip+'&appid=cb86559b42d1885ea4cb465cacd3627d&units=metric'; 
	const userResponse = document.querySelector('#feelings').value;
	getzData(weatherUrl)
	.then(function(data){
		console.log(data);
		if(data && Object.keys(data).length !== 0 && data.constructor === Object){
			const temp = data.main.temp;
			addzData('/addData', {temp:temp, date:newDate, UserResp:userResponse});
		}else{
			addzData('/addData', {temp:'60C', date:newDate, UserResp:userResponse});
		}
	})
	.then(function(){
		console.log('all chaining done well');
	});
}
