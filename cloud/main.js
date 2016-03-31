var secret = process.env.APP_SECRET;
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var sendingNumber = process.env.TWILIO_NUMBER;
var twilio = require("twilio")('accountSid', 'authToken');


Parse.Cloud.define('hello', function(req, res) {
  res.success("https://" + accountSid + ":" + authToken + "@api.twilio.com:8443/2010-04-01/Accounts/" + accountSid + "/Messages.json");
});

Parse.Cloud.define('sendAMessage', function(req, res) {
	Parse.Cloud.httpRequest({
		method: "POST",
		url:"https://" + accountSid + ":" + authToken + "@api.twilio.com:8443/2010-04-01/Accounts/" + accountSid + "/SMS/Messages.json",
		to:"+15209065667",
		From:"+12677056297",
		Body:"Test"
	}).then(function(httpResponse) {
		console.log("Success " + httpResponse.text);
	},
	function(httpResponse) {
		console.log("Error" + httpResponse.text);
	});
});

Parse.Cloud.define('sendATestMessage', function(req, res){
  twilio.createMessage({
    From: "+12677056297",
    To: "+15209065667",
    Body: "Test message"
  }, {
    success: function(httpResponse) {response.success("Sent!");},
    error: function(httpResponse) {response.error("Error!");}
  });
});
