var secret = process.env.APP_SECRET;
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var sendingNumber = process.env.TWILIO_NUMBER;
var client = require("twilio")('accountSid', 'authToken');


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
  client.sendMessage({

    to: '+12677056297', // Any number Twilio can deliver to
    from: '+15209065667', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }

});
});
