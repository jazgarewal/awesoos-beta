var secret = process.env.APP_SECRET;
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var sendingNumber = process.env.TWILIO_NUMBER;

Parse.Cloud.define('hello', function(req, res) {
  res.success("https://" + accountSid + ":" + authToken + "@api.twilio.com:8443/2010-04-01/Accounts/" + accountSid + "/Messages.json");
});

Parse.Cloud.define('sendAMessage', function(req, res) {
	Parse.Cloud.httpRequest({
		method: "POST",
		url:"https://" + accountSid + ":" + authToken + "@api.twilio.com:8443/2010-04-01/Accounts/" + accountSid + "/Messages.json",
		to:"+15209065667",
		From:"+15005550006",
		Body:"Test"
	}).then(function(httpResponse) {
		console.log("Success " + httpResponse.text);
	},
	function(httpResponse) {
		console.log("Error" + httpResponse.text);
	});
});
