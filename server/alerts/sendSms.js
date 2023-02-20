const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hi Simmu, Harsh this side',
     from: '+12316254740',
     to: '+918824761350'
   })
  .then(message => console.log(message.sid));
