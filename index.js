const express = require('express');
var nodemailer = require('nodemailer');

const app = express();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'the.real.e.say@gmail.com',
    pass: 'lxlhjclaoqbnmfoj'
  }
});

function sendEmail(e, t) {
	var mailOptions = {
  	from: 'the.real.e.say@gmail.com',
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

app.get("/", (req, resp) => {resp.send("Hello World!")});

app.post("/email", (request, response) => {
	var data = request.body;
	sendEmail('carsonouckama@gmail.com', data.text);
	response.send({success: true});
})

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use( express.static('public') );
app.use(express.json());
