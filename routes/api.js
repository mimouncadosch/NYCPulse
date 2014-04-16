//The API of your application

var request = require('request');
/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.times = function (req, res) {
	var hr = req.query.hr;
	var min = req.query.min;
	var url = 'http://mtaapi.herokuapp.com/times?hour=' + hr + '&minute=' + min;
	console.log(url);
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parsedRes = JSON.parse(body);
			res.json(parsedRes);
		}
	});
}
