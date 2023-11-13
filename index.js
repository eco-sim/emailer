const express = require('express');
var nodemailer = require('nodemailer');
const path = require("path");

const app = express();
app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
});

var transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'carsonouckama@gmail.com',
    pass: 'msym pdld npej ychq'
  }
});

function sendEmail(e, t) {
	var mailOptions = {
  	from: 'carsonouckama@gmail.com',
  	to: e,
  	subject: 'E-Say Notification',
  	text: t
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});	

}

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use(express.json());

app.get("/", (req, resp) => {resp.sendFile(path.join(__dirname, "/index.html"));});

app.post("/email", (request, response) => {
	var data = request.body;
	sendEmail('carsonouckama@gmail.com', data.text);
	response.send({success: true});
});

