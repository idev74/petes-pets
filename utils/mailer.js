const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const auth = {
  auth: {
    api_key: process.env.PRIVATE_MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports.sendMail = (user, req, res) => {
    nodemailerMailgun.sendMail({
        from: 'no-reply@example.com',
        to: user.email,
        subject: 'Pet Purchased!',
        template: {
            name: 'email.handlebars',
            engine: 'handlebars',
            context: user
        }
    }).then(info => {
        console.log(`Response: ${info}`);
        res.redirect(`/pets/${req.params.id}`);
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.redirect(`/pets/${req.params.id}`);
    });
}