const apiKey = '&appid=cb86559b42d1885ea4cb465cacd3627d&units=metric';
/**
* @description our app initializer function
* it will just check when the DOM is ready and add a click listener
* to our button
*/
function initializer(){
	document.addEventListener('DOMContentLoaded', function(){
		document.querySelector('#generate').addEventListener('click', actionOnClick);
	});
}
// call the intializer function to start our app
initializer();

/**
* @description a function that will return async function
* which will be used to get data from the openweathermap api
*/
function getData(){
	const getData = async (url='')=>{
		const res = await fetch(url);
		try{
			const newData = await res.json();
			return newData;
		}catch(err){
			console.log('error: ', err);
		}
	}
	return getData;
}

/**
* @description a function that will return our async function 
* which make a POST request to the server
* it will be used to POST data ,retrieved from the user call, to our server.
*/
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
			return newData;
		}catch(err){
			console.log('error: ', err);
		}
	}
	return addData;
}

/**
* @description a function that will be called when the button is clicked 
* it takes care of every thing , the url for openweathermap api, the date of
* the call , and make the call and get the data and then save it to our server
* it makes sure we get a response otherwise the values presented in UI update 
* will be different indicating a failed request.
*/
function actionOnClick(){
	const getzData = getData();
	const addzData = addData();
	// Create a new date instance dynamically with JS
	let d = new Date();
	let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
	+'   '+ d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	// get zip code entered by the user
	const zip = document.querySelector('#zip').value;
	// set the url accordingly
	const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
						+zip+apiKey; 
	const userResponse = document.querySelector('#feelings').value;
	getzData(weatherUrl)
	.then(function(data){
		if(data.cod === 200){
			const temp = data.main.temp+' C';
			addzData('/addData', {temp:temp, date:newDate, UserResp:userResponse});
		}else{
			addzData('/addData', {temp:'No Response', date:newDate, UserResp:'Please check your zipcode '});
		}
	})
	.then(function(){
		updateUI();
	});
}

/**
* @description a function to update the UI
* @param dateVal the date value to be set for the div with id date
* @param tempVal the temperature value to be set to the div with id temp
* @param contVal the comment value to set value for the div with id content
*/
function updateUI(){
	const getLast = getData();
	getLast('/last')
	.then(function(data){
		const tempVal = data.temp;
		const dateVal = data.date;
		const contVal = data.UserResp;
		document.querySelector('#date').innerHTML = 'Time: '+dateVal;
		document.querySelector('#temp').innerHTML = 'Temperature: '+tempVal;
		document.querySelector('#content').innerHTML = 'Comment: '+contVal;
	});

}
