const nodemailer = require("nodemailer/lib/nodemailer");

var mailgunsmtpTransport = nodemailer.createTransport({
  host: process.env.SERVER_MAILGUN,
  port: process.env.PORT_MAILGUN,
  auth: {
    user: process.env.USERNAME_MAILGUN,
    pass: process.env.PASSWORD_MAILGUN,
  },
});

var elastichsmtpTransport = nodemailer.createTransport({
  host: process.env.SERVER_ELASTICEMAIL,
  port: process.env.PORT_ELASTICEMAIL,
  auth: {
    user: process.env.USERNAME_ELASTICEMAIL,
    pass: process.env.PASSWORD_ELASTICEMAIL,
  },
});

export default function handle(req, res) {
  var mailOpts = {
    from: "dophamnguyen@dophamnguyen.xyz",
    to: "	npham140201@dophamnguyen.xyz",
    subject: "test subject",
    text: "test message form mailgun",
    html: "<b >test message form mailgun</b>",
  };

  elastichsmtpTransport
    .sendMail(mailOpts)
    .catch((err) => console.log(err))
    .then((value) => res.status(200).json({ status: "ok" }));
}
