/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* function to get data /* template test*/
/* should fetch data from our server.
*/
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

/* a function to add data /* template test*/
/* should add data to our server side */
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


/* chain both methods  /* template test*/
/* here we should get data from weather apis then post italics
* to our server and save it after that we should update our UI
*/
getData('/data')
.then(function(data){
	console.log(data);
	if(data && Object.keys(data).length !== 0 && data.constructor === Object){
		const entry1 = data['obj0'];
		addData('/addData', {temp:entry1.temp, date:entry1.date, UserResp:entry1.UserResp});
	}else{
		addData('/addData', {temp:'60C', date:newDate, UserResp:'cool app'});
	}
})
.then(function(){
	console.log('all chaining done well');
});
