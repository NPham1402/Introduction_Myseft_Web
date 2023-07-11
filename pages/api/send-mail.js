const nodemailer = require("nodemailer/lib/nodemailer");

var smtpTransport = nodemailer.createTransport({
  host: " smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.USERNAME_MAILGUN,
    pass: process.env.PASSWORD_MAILGUN,
  },
});

export default function handle(req, res) {
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: "npham140201@gmail.com",
    subject: "Test Nodemailer",
    text: "You recieved message from ",
    html: "<p>You have got a new message</b><ul><li>Username:" + "</li></ul>",
  };

  smtpTransport
    .sendMail(mainOptions)
    .catch((err) => console.log(err))
    .then((value) => console.log(value));
  res.status(200).json({ text: process.env.USERNAME_MAILGUN });
}
