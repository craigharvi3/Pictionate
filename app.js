var express = require("express");
const path = require('path')
var app = express();

app.use(express.static(__dirname + '/public'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
	// console.log(request.user.id)
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(8080, function() {
	console.log('Listening to http://localhost:' + 8080);
});